import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import type { Env } from './types'
import jobsRouter from './routes/jobs'

const app = new Hono<{ Bindings: Env }>()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files from public directory
app.use('/static/*', serveStatic({ root: './' }))

// API routes
app.route('/api/jobs', jobsRouter)

// Health check endpoint
app.get('/api/health', (c) => {
  return c.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'Facebook Ad Thief API'
  })
})

// Landing page
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Facebook Ad Thief - AI-Powered Ad Recreation</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          .glass {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
        </style>
    </head>
    <body class="bg-gray-50">
        <!-- Hero Section -->
        <div class="gradient-bg text-white">
            <div class="max-w-6xl mx-auto px-4 py-16">
                <div class="text-center mb-12">
                    <h1 class="text-5xl font-bold mb-4">
                        <i class="fas fa-magic mr-3"></i>
                        Facebook Ad Thief
                    </h1>
                    <p class="text-xl text-gray-100 max-w-2xl mx-auto">
                        Turn your competitor's winning ads into your own. AI-powered ad recreation in minutes.
                    </p>
                </div>

                <!-- Feature Cards -->
                <div class="grid md:grid-cols-3 gap-6 mb-12">
                    <div class="glass rounded-xl p-6 text-center">
                        <i class="fas fa-search text-4xl mb-4"></i>
                        <h3 class="text-lg font-semibold mb-2">Scrape Ads</h3>
                        <p class="text-sm text-gray-200">Pull winning ads from Facebook Ad Library automatically</p>
                    </div>
                    <div class="glass rounded-xl p-6 text-center">
                        <i class="fas fa-wand-magic-sparkles text-4xl mb-4"></i>
                        <h3 class="text-lg font-semibold mb-2">AI Recreation</h3>
                        <p class="text-sm text-gray-200">Gemini 2.5 recreates ads with your branding in seconds</p>
                    </div>
                    <div class="glass rounded-xl p-6 text-center">
                        <i class="fas fa-download text-4xl mb-4"></i>
                        <h3 class="text-lg font-semibold mb-2">Download All</h3>
                        <p class="text-sm text-gray-200">Get all generated creatives ready for your campaigns</p>
                    </div>
                </div>

                <!-- CTA Button -->
                <div class="text-center">
                    <a href="/new" class="inline-block bg-white text-purple-600 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition text-lg shadow-xl">
                        <i class="fas fa-rocket mr-2"></i>
                        Create Your First Job
                    </a>
                </div>
            </div>
        </div>

        <!-- How It Works -->
        <div class="max-w-6xl mx-auto px-4 py-16">
            <h2 class="text-3xl font-bold text-gray-800 mb-12 text-center">How It Works</h2>
            
            <div class="grid md:grid-cols-4 gap-8">
                <div class="text-center">
                    <div class="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="text-2xl font-bold text-purple-600">1</span>
                    </div>
                    <h3 class="font-semibold mb-2">Paste URL</h3>
                    <p class="text-sm text-gray-600">Enter your competitor's Facebook Ad Library page</p>
                </div>

                <div class="text-center">
                    <div class="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="text-2xl font-bold text-purple-600">2</span>
                    </div>
                    <h3 class="font-semibold mb-2">Upload Product</h3>
                    <p class="text-sm text-gray-600">Add your product image for brand replacement</p>
                </div>

                <div class="text-center">
                    <div class="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="text-2xl font-bold text-purple-600">3</span>
                    </div>
                    <h3 class="font-semibold mb-2">AI Processing</h3>
                    <p class="text-sm text-gray-600">Wait 2-5 minutes while AI recreates the ads</p>
                </div>

                <div class="text-center">
                    <div class="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="text-2xl font-bold text-purple-600">4</span>
                    </div>
                    <h3 class="font-semibold mb-2">Download</h3>
                    <p class="text-sm text-gray-600">Get your campaign-ready ad creatives</p>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <footer class="bg-gray-800 text-white py-8 mt-16">
            <div class="max-w-6xl mx-auto px-4 text-center">
                <p class="text-gray-400">
                    <i class="fas fa-magic mr-2"></i>
                    Powered by Google Gemini 2.5, Apify & Cloudflare
                </p>
                <p class="text-sm text-gray-500 mt-2">
                    Inspired layouts for ideation. Verify trademark usage before publishing.
                </p>
            </div>
        </footer>
    </body>
    </html>
  `)
})

// New Job Form
app.get('/new', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Create New Job - Facebook Ad Thief</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
        <div class="max-w-3xl mx-auto px-4 py-12">
            <!-- Header -->
            <div class="mb-8">
                <a href="/" class="text-purple-600 hover:text-purple-700 mb-4 inline-block">
                    <i class="fas fa-arrow-left mr-2"></i>Back to Home
                </a>
                <h1 class="text-3xl font-bold text-gray-800">
                    <i class="fas fa-plus-circle mr-3"></i>
                    Create New Job
                </h1>
                <p class="text-gray-600 mt-2">Fill in the details below to start generating inspired ad creatives</p>
            </div>

            <!-- Form Card -->
            <div class="bg-white rounded-xl shadow-lg p-8">
                <form id="jobForm" class="space-y-6">
                    <!-- Facebook Ad Library URL -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            <i class="fas fa-link mr-2"></i>
                            Facebook Ad Library URL *
                        </label>
                        <input 
                            type="url" 
                            id="sourceUrl" 
                            name="sourceUrl"
                            required
                            placeholder="https://www.facebook.com/ads/library/?id=..."
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <p class="text-sm text-gray-500 mt-1">
                            Navigate to Facebook Ad Library, search for your competitor, and paste the URL here
                        </p>
                    </div>

                    <!-- Brand Name -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            <i class="fas fa-tag mr-2"></i>
                            Your Brand Name *
                        </label>
                        <input 
                            type="text" 
                            id="brandName" 
                            name="brandName"
                            required
                            value="Your Brand"
                            placeholder="e.g., Thrive Mix, Awesome Product"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>

                    <!-- Product Image Upload -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            <i class="fas fa-image mr-2"></i>
                            Product Image *
                        </label>
                        <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-purple-400 transition">
                            <div class="space-y-1 text-center">
                                <i class="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
                                <div class="flex text-sm text-gray-600">
                                    <label for="productImage" class="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500">
                                        <span>Upload a file</span>
                                        <input id="productImage" name="productImage" type="file" accept="image/*" required class="sr-only">
                                    </label>
                                    <p class="pl-1">or drag and drop</p>
                                </div>
                                <p class="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB</p>
                            </div>
                        </div>
                        <div id="imagePreview" class="mt-4 hidden">
                            <img id="previewImg" class="max-w-xs mx-auto rounded-lg shadow" />
                        </div>
                    </div>

                    <!-- Advanced Options -->
                    <div class="border-t pt-6">
                        <h3 class="text-lg font-semibold mb-4">
                            <i class="fas fa-sliders-h mr-2"></i>
                            Advanced Options
                        </h3>
                        
                        <div class="grid md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    Max Ads to Process
                                </label>
                                <select id="maxAds" name="maxAds" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                                    <option value="5">5 ads</option>
                                    <option value="10">10 ads</option>
                                    <option value="20" selected>20 ads (recommended)</option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    Batch Size (Parallelism)
                                </label>
                                <select id="batchSize" name="batchSize" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                                    <option value="3">3 (slower, safer)</option>
                                    <option value="5" selected>5 (recommended)</option>
                                    <option value="10">10 (faster, may hit limits)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <div class="flex gap-4">
                        <button 
                            type="submit" 
                            id="submitBtn"
                            class="flex-1 bg-purple-600 text-white font-bold px-6 py-4 rounded-lg hover:bg-purple-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            <i class="fas fa-magic mr-2"></i>
                            <span id="submitText">Generate Inspired Creatives</span>
                        </button>
                    </div>

                    <!-- Status Message -->
                    <div id="statusMessage" class="hidden mt-4 p-4 rounded-lg"></div>
                </form>
            </div>
        </div>

        <script src="/static/job-form.js"></script>
    </body>
    </html>
  `)
})

// Job Status Page
app.get('/jobs/:id', (c) => {
  const jobId = c.req.param('id')
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Job Status - Facebook Ad Thief</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 py-12">
            <!-- Header -->
            <div class="mb-8">
                <a href="/" class="text-purple-600 hover:text-purple-700 mb-4 inline-block">
                    <i class="fas fa-arrow-left mr-2"></i>Back to Home
                </a>
                <h1 class="text-3xl font-bold text-gray-800">
                    <i class="fas fa-tasks mr-3"></i>
                    Job Status
                </h1>
                <p class="text-gray-600 mt-2">Job ID: ${jobId}</p>
            </div>

            <!-- Loading State -->
            <div id="loading" class="text-center py-12">
                <i class="fas fa-spinner fa-spin text-4xl text-purple-600 mb-4"></i>
                <p class="text-gray-600">Loading job details...</p>
            </div>

            <!-- Job Content (populated by JavaScript) -->
            <div id="jobContent" class="hidden"></div>
        </div>

        <script>
            const jobId = '${jobId}';
        </script>
        <script src="/static/job-status.js"></script>
    </body>
    </html>
  `)
})

export default app
