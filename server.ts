import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  initialSiteConfig,
  initialPromotions,
  initialPackages,
  initialInstallationServices,
  initialTestimonials,
  initialCoverageAreas,
  initialLeads,
} from './src/data/defaultData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, 'db.json');

// Helper to get db state
const getDbData = () => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading db.json:', err);
  }

  // Fallback / Initial seed
  const defaultData = {
    siteConfig: initialSiteConfig,
    promotions: initialPromotions,
    packages: initialPackages,
    services: initialInstallationServices,
    testimonials: initialTestimonials,
    coverageAreas: initialCoverageAreas,
    leads: initialLeads,
  };

  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2));
  } catch (err) {
    console.error('Error initializing db.json:', err);
  }

  return defaultData;
};

// Helper to save db state
const saveDbData = (data: any) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing to db.json:', err);
  }
};

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json({ limit: '10mb' }));

  // API REST Endpoints
  app.get('/api/data', (_req, res) => {
    const data = getDbData();
    res.json(data);
  });

  app.post('/api/site-config', (req, res) => {
    const data = getDbData();
    data.siteConfig = req.body;
    saveDbData(data);
    res.json({ success: true, siteConfig: data.siteConfig });
  });

  app.post('/api/promotions', (req, res) => {
    const data = getDbData();
    data.promotions = req.body;
    saveDbData(data);
    res.json({ success: true, promotions: data.promotions });
  });

  app.post('/api/packages', (req, res) => {
    const data = getDbData();
    data.packages = req.body;
    saveDbData(data);
    res.json({ success: true, packages: data.packages });
  });

  app.post('/api/services', (req, res) => {
    const data = getDbData();
    data.services = req.body;
    saveDbData(data);
    res.json({ success: true, services: data.services });
  });

  app.post('/api/testimonials', (req, res) => {
    const data = getDbData();
    data.testimonials = req.body;
    saveDbData(data);
    res.json({ success: true, testimonials: data.testimonials });
  });

  app.post('/api/coverage', (req, res) => {
    const data = getDbData();
    data.coverageAreas = req.body;
    saveDbData(data);
    res.json({ success: true, coverageAreas: data.coverageAreas });
  });

  app.post('/api/leads', (req, res) => {
    const data = getDbData();
    data.leads = req.body;
    saveDbData(data);
    res.json({ success: true, leads: data.leads });
  });

  app.post('/api/leads/add', (req, res) => {
    const data = getDbData();
    const newLead = {
      ...req.body,
      id: 'lead-' + Date.now(),
      status: 'Baru',
      createdAt: new Date().toLocaleString('id-ID', {
        dateStyle: 'short',
        timeStyle: 'short',
      }),
    };
    data.leads = [newLead, ...(data.leads || [])];
    saveDbData(data);
    res.json({ success: true, newLead, leads: data.leads });
  });

  app.post('/api/reset', (_req, res) => {
    const defaultData = {
      siteConfig: initialSiteConfig,
      promotions: initialPromotions,
      packages: initialPackages,
      services: initialInstallationServices,
      testimonials: initialTestimonials,
      coverageAreas: initialCoverageAreas,
      leads: initialLeads,
    };
    saveDbData(defaultData);
    res.json({ success: true, data: defaultData });
  });

  app.post('/api/import', (req, res) => {
    const body = req.body;
    const current = getDbData();
    const newData = {
      siteConfig: body.siteConfig || current.siteConfig,
      promotions: body.promotions || current.promotions,
      packages: body.packages || current.packages,
      services: body.services || current.services,
      testimonials: body.testimonials || current.testimonials,
      coverageAreas: body.coverageAreas || body.coverage || current.coverageAreas,
      leads: body.leads || current.leads,
    };
    saveDbData(newData);
    res.json({ success: true, data: newData });
  });

  // Serve static assets from public folder
  app.use(express.static(path.join(__dirname, 'public')));

  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server active on port ${PORT} (VPS Express Backend)`);
  });
}

startServer();
