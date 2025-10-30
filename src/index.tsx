import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import type { Env } from './types'
import jobsRouter from './routes/jobs'

const app = new Hono<{ Bindings: Env }>()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// API Routes
app.route('/api/jobs', jobsRouter)

// Health check
app.get('/api/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() })
})

// Landing page
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Facebook Ad Thief - Clone Competitor Ads with AI</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          .card-shadow {
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          }
        </style>
    </head>
    <body class="bg-gray-50">
        <!-- Header -->
        <nav class="gradient-bg text-white py-4 shadow-lg">
            <div class="container mx-auto px-4 flex justify-between items-center">
                <div class="flex items-center space-x-2">
                    <i class="fas fa-robot text-2xl"></i>
                    <h1 class="text-xl font-bold">Facebook Ad Thief</h1>
                </div>
                <div class="text-sm">
                    <span class="bg-white/20 px-3 py-1 rounded">Powered by AI</span>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <div class="gradient-bg text-white py-16">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-4xl font-bold mb-4">
                    <i class="fas fa-magic mr-2"></i>
                    Clone Competitor Ads in Minutes
                </h2>
                <p class="text-xl mb-8 opacity-90">
                    Paste your competitor's Facebook Ad Library URL → Upload your product → Get inspired creatives
                </p>
                <a href="/new" class="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                    <i class="fas fa-rocket mr-2"></i>
                    Start Creating Ads
                </a>
            </div>
        </div>

        <!-- How It Works -->
        <div class="container mx-auto px-4 py-16">
            <h3 class="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h3>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="text-center p-6 card-shadow bg-white rounded-lg">
                    <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-link text-purple-600 text-2xl"></i>
                    </div>
                    <h4 class="text-xl font-semibold mb-2">1. Paste URL</h4>
                    <p class="text-gray-600">Enter your competitor's Facebook Ad Library URL</p>
                </div>
                <div class="text-center p-6 card-shadow bg-white rounded-lg">
                    <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-image text-purple-600 text-2xl"></i>
                    </div>
                    <h4 class="text-xl font-semibold mb-2">2. Upload Product</h4>
                    <p class="text-gray-600">Upload your product image and brand name</p>
                </div>
                <div class="text-center p-6 card-shadow bg-white rounded-lg">
                    <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-wand-magic-sparkles text-purple-600 text-2xl"></i>
                    </div>
                    <h4 class="text-xl font-semibold mb-2">3. Get Results</h4>
                    <p class="text-gray-600">AI generates inspired ads with your branding</p>
                </div>
            </div>
        </div>

        <!-- Features -->
        <div class="bg-gray-100 py-16">
            <div class="container mx-auto px-4">
                <h3 class="text-3xl font-bold text-center mb-12 text-gray-800">Features</h3>
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="bg-white p-6 rounded-lg">
                        <i class="fas fa-bolt text-purple-600 text-3xl mb-3"></i>
                        <h4 class="font-semibold mb-2">Lightning Fast</h4>
                        <p class="text-sm text-gray-600">Process 20 ads in 2-5 minutes</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg">
                        <i class="fas fa-shield-halved text-purple-600 text-3xl mb-3"></i>
                        <h4 class="font-semibold mb-2">Brand Safe</h4>
                        <p class="text-sm text-gray-600">Auto-detects and removes competitor branding</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg">
                        <i class="fas fa-brain text-purple-600 text-3xl mb-3"></i>
                        <h4 class="font-semibold mb-2">AI-Powered</h4>
                        <p class="text-sm text-gray-600">Google Gemini 2.5 for best quality</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg">
                        <i class="fas fa-download text-purple-600 text-3xl mb-3"></i>
                        <h4 class="font-semibold mb-2">Easy Export</h4>
                        <p class="text-sm text-gray-600">Download individual or bulk ZIP</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- CTA -->
        <div class="container mx-auto px-4 py-16 text-center">
            <h3 class="text-3xl font-bold mb-4 text-gray-800">Ready to Steal Some Ads?</h3>
            <p class="text-gray-600 mb-8">This tool recreates layouts for ideation. Verify trademark usage and platform policies before publishing.</p>
            <a href="/new" class="inline-block gradient-bg text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">
                <i class="fas fa-play mr-2"></i>
                Get Started Now
            </a>
        </div>

        <!-- Footer -->
        <footer class="bg-gray-800 text-white py-8">
            <div class="container mx-auto px-4 text-center">
                <p class="text-sm opacity-75">
                    <i class="fas fa-info-circle mr-1"></i>
                    Disclaimer: For ideation purposes only. Always respect intellectual property and platform policies.
                </p>
                <p class="mt-2 text-xs opacity-50">Built with Hono + Cloudflare Pages + Google Gemini</p>
            </div>
        </footer>
    </body>
    </html>
  `)
})

// Job creation form
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
        <style>
          .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
        </style>
    </head>
    <body class="bg-gray-50 min-h-screen">
        <nav class="gradient-bg text-white py-4 shadow-lg">
            <div class="container mx-auto px-4 flex justify-between items-center">
                <a href="/" class="flex items-center space-x-2 hover:opacity-80">
                    <i class="fas fa-arrow-left"></i>
                    <span class="font-semibold">Back to Home</span>
                </a>
                <h1 class="text-xl font-bold">Create New Job</h1>
            </div>
        </nav>

        <div class="container mx-auto px-4 py-8 max-w-2xl">
            <div class="bg-white rounded-lg shadow-lg p-8">
                <h2 class="text-2xl font-bold mb-6 text-gray-800">
                    <i class="fas fa-magic mr-2 text-purple-600"></i>
                    Start Cloning Ads
                </h2>

                <form id="jobForm" class="space-y-6">
                    <!-- Facebook Ad Library URL -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            <i class="fas fa-link mr-1"></i>
                            Facebook Ad Library URL *
                        </label>
                        <input 
                            type="url" 
                            id="sourceUrl" 
                            required
                            placeholder="https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&q=..."
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <p class="mt-1 text-xs text-gray-500">
                            <i class="fas fa-info-circle mr-1"></i>
                            Go to Facebook Ad Library, search for your competitor, and copy the URL
                        </p>
                    </div>

                    <!-- Brand Name -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            <i class="fas fa-tag mr-1"></i>
                            Your Brand Name *
                        </label>
                        <input 
                            type="text" 
                            id="brandName" 
                            required
                            placeholder="e.g., Thrive Mix"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>

                    <!-- Product Image Upload -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            <i class="fas fa-image mr-1"></i>
                            Your Product Image *
                        </label>
                        <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition cursor-pointer" id="dropZone">
                            <input type="file" id="productImage" accept="image/*" class="hidden" required />
                            <i class="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-2"></i>
                            <p class="text-gray-600">Click to upload or drag and drop</p>
                            <p class="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                        </div>
                        <div id="imagePreview" class="mt-4 hidden">
                            <img id="previewImg" class="max-w-full h-48 mx-auto rounded-lg shadow" />
                        </div>
                    </div>

                    <!-- Advanced Options -->
                    <details class="border border-gray-200 rounded-lg p-4">
                        <summary class="cursor-pointer font-medium text-gray-700">
                            <i class="fas fa-sliders mr-1"></i>
                            Advanced Options
                        </summary>
                        <div class="mt-4 space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    Max Ads to Process
                                </label>
                                <input 
                                    type="number" 
                                    id="maxAds" 
                                    value="20" 
                                    min="1" 
                                    max="50"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    Batch Size (Parallelism)
                                </label>
                                <input 
                                    type="number" 
                                    id="batchSize" 
                                    value="5" 
                                    min="1" 
                                    max="10"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>
                    </details>

                    <!-- Submit Button -->
                    <button 
                        type="submit" 
                        id="submitBtn"
                        class="w-full gradient-bg text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
                    >
                        <i class="fas fa-rocket mr-2"></i>
                        Generate Inspired Creatives
                    </button>

                    <!-- Status Messages -->
                    <div id="statusMessage" class="hidden"></div>
                </form>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script>
          // File upload handling
          const dropZone = document.getElementById('dropZone');
          const fileInput = document.getElementById('productImage');
          const imagePreview = document.getElementById('imagePreview');
          const previewImg = document.getElementById('previewImg');
          let selectedFile = null;

          dropZone.onclick = () => fileInput.click();

          dropZone.ondragover = (e) => {
            e.preventDefault();
            dropZone.classList.add('border-purple-500');
          };

          dropZone.ondragleave = () => {
            dropZone.classList.remove('border-purple-500');
          };

          dropZone.ondrop = (e) => {
            e.preventDefault();
            dropZone.classList.remove('border-purple-500');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
              handleFile(files[0]);
            }
          };

          fileInput.onchange = (e) => {
            if (e.target.files.length > 0) {
              handleFile(e.target.files[0]);
            }
          };

          function handleFile(file) {
            if (!file.type.startsWith('image/')) {
              alert('Please select an image file');
              return;
            }
            if (file.size > 10 * 1024 * 1024) {
              alert('File size must be less than 10MB');
              return;
            }

            selectedFile = file;
            const reader = new FileReader();
            reader.onload = (e) => {
              previewImg.src = e.target.result;
              imagePreview.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
          }

          // Form submission
          document.getElementById('jobForm').onsubmit = async (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('submitBtn');
            const statusMessage = document.getElementById('statusMessage');

            // Disable form
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Creating Job...';

            try {
              // Convert file to base64
              const reader = new FileReader();
              const base64Promise = new Promise((resolve) => {
                reader.onload = () => resolve(reader.result);
                reader.readAsDataURL(selectedFile);
              });
              const productImageBase64 = await base64Promise;

              // Submit job
              const response = await axios.post('/api/jobs', {
                sourceUrl: document.getElementById('sourceUrl').value,
                brandName: document.getElementById('brandName').value,
                productImage: productImageBase64,
                maxAds: parseInt(document.getElementById('maxAds').value),
                batchSize: parseInt(document.getElementById('batchSize').value)
              });

              // Redirect to job status page
              window.location.href = '/jobs/' + response.data.jobId;

            } catch (error) {
              console.error('Error:', error);
              statusMessage.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded';
              statusMessage.innerHTML = '<i class="fas fa-exclamation-triangle mr-2"></i>' + 
                (error.response?.data?.error || 'Failed to create job. Please try again.');
              statusMessage.classList.remove('hidden');

              submitBtn.disabled = false;
              submitBtn.innerHTML = '<i class="fas fa-rocket mr-2"></i>Generate Inspired Creatives';
            }
          };
        </script>
    </body>
    </html>
  `)
})

// Job status page
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
        <style>
          .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1.5rem;
          }
        </style>
    </head>
    <body class="bg-gray-50 min-h-screen">
        <nav class="gradient-bg text-white py-4 shadow-lg">
            <div class="container mx-auto px-4 flex justify-between items-center">
                <a href="/" class="flex items-center space-x-2 hover:opacity-80">
                    <i class="fas fa-arrow-left"></i>
                    <span class="font-semibold">Back to Home</span>
                </a>
                <h1 class="text-xl font-bold">Job Status</h1>
            </div>
        </nav>

        <div class="container mx-auto px-4 py-8">
            <!-- Status Card -->
            <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-2xl font-bold text-gray-800" id="jobTitle">
                        <i class="fas fa-cog fa-spin text-purple-600 mr-2"></i>
                        Loading Job...
                    </h2>
                    <span id="statusBadge" class="px-4 py-2 rounded-full text-sm font-semibold">
                        <i class="fas fa-spinner fa-spin mr-1"></i>
                        Queued
                    </span>
                </div>

                <!-- Progress Bar -->
                <div class="mb-6">
                    <div class="flex justify-between text-sm text-gray-600 mb-2">
                        <span id="progressText">Processing...</span>
                        <span id="progressPercent">0%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-3">
                        <div id="progressBar" class="gradient-bg h-3 rounded-full transition-all duration-500" style="width: 0%"></div>
                    </div>
                </div>

                <!-- Stats -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="text-center p-4 bg-gray-50 rounded-lg">
                        <div class="text-2xl font-bold text-purple-600" id="totalAds">0</div>
                        <div class="text-xs text-gray-600">Total Ads</div>
                    </div>
                    <div class="text-center p-4 bg-gray-50 rounded-lg">
                        <div class="text-2xl font-bold text-blue-600" id="processedAds">0</div>
                        <div class="text-xs text-gray-600">Processed</div>
                    </div>
                    <div class="text-center p-4 bg-gray-50 rounded-lg">
                        <div class="text-2xl font-bold text-green-600" id="successfulAds">0</div>
                        <div class="text-xs text-gray-600">Successful</div>
                    </div>
                    <div class="text-center p-4 bg-gray-50 rounded-lg">
                        <div class="text-2xl font-bold text-red-600" id="failedAds">0</div>
                        <div class="text-xs text-gray-600">Failed</div>
                    </div>
                </div>
            </div>

            <!-- Gallery -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-xl font-bold text-gray-800">
                        <i class="fas fa-images mr-2 text-purple-600"></i>
                        Generated Ads
                    </h3>
                    <button id="downloadAllBtn" class="hidden px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                        <i class="fas fa-download mr-2"></i>
                        Download All
                    </button>
                </div>

                <div id="gallery" class="gallery-grid">
                    <div class="text-center text-gray-500 py-12 col-span-full">
                        <i class="fas fa-hourglass-half text-4xl mb-3"></i>
                        <p>Waiting for generated ads...</p>
                    </div>
                </div>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script>
          const jobId = '${jobId}';
          let pollInterval;

          const statusColors = {
            queued: 'bg-gray-400',
            scraping: 'bg-blue-500',
            prompting: 'bg-yellow-500',
            generating: 'bg-purple-500',
            saving: 'bg-indigo-500',
            done: 'bg-green-500',
            failed: 'bg-red-500'
          };

          const statusIcons = {
            queued: 'fa-clock',
            scraping: 'fa-spider',
            prompting: 'fa-brain',
            generating: 'fa-wand-magic-sparkles',
            saving: 'fa-save',
            done: 'fa-check-circle',
            failed: 'fa-exclamation-triangle'
          };

          async function updateJobStatus() {
            try {
              const response = await axios.get('/api/jobs/' + jobId);
              const job = response.data;

              // Update title
              document.getElementById('jobTitle').innerHTML = 
                '<i class="fas ' + statusIcons[job.status] + ' mr-2 text-purple-600"></i>' +
                'Job ' + job.status.charAt(0).toUpperCase() + job.status.slice(1);

              // Update status badge
              const badge = document.getElementById('statusBadge');
              badge.className = 'px-4 py-2 rounded-full text-sm font-semibold text-white ' + statusColors[job.status];
              badge.innerHTML = '<i class="fas ' + statusIcons[job.status] + ' mr-1"></i>' + 
                job.status.charAt(0).toUpperCase() + job.status.slice(1);

              // Update stats
              document.getElementById('totalAds').textContent = job.total_ads || 0;
              document.getElementById('processedAds').textContent = job.processed_ads || 0;
              document.getElementById('successfulAds').textContent = job.successful_ads || 0;
              document.getElementById('failedAds').textContent = job.failed_ads || 0;

              // Update progress
              const progress = job.total_ads > 0 ? (job.processed_ads / job.total_ads * 100) : 0;
              document.getElementById('progressBar').style.width = progress + '%';
              document.getElementById('progressPercent').textContent = Math.round(progress) + '%';
              document.getElementById('progressText').textContent = 
                job.status === 'done' ? 'Completed!' : 
                job.status === 'failed' ? 'Failed' : 
                'Processing ' + (job.processed_ads || 0) + ' of ' + (job.total_ads || 0) + ' ads...';

              // Update gallery
              if (job.assets && job.assets.length > 0) {
                updateGallery(job.assets);
                document.getElementById('downloadAllBtn').classList.remove('hidden');
              }

              // Stop polling if done or failed
              if (job.status === 'done' || job.status === 'failed') {
                clearInterval(pollInterval);
              }

            } catch (error) {
              console.error('Error fetching job status:', error);
            }
          }

          function updateGallery(assets) {
            const gallery = document.getElementById('gallery');
            
            // Filter out prohibited assets
            const validAssets = assets.filter(a => !a.prohibited);
            
            if (validAssets.length === 0) {
              gallery.innerHTML = '<div class="text-center text-gray-500 py-12 col-span-full"><i class="fas fa-hourglass-half text-4xl mb-3"></i><p>Generating ads...</p></div>';
              return;
            }

            gallery.innerHTML = validAssets.map(asset => 
              '<div class="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">' +
              '  <img src="' + asset.file_url + '" class="w-full h-64 object-cover" />' +
              '  <div class="p-4">' +
              '    <div class="flex items-center justify-between">' +
              '      <span class="text-xs text-gray-500"><i class="far fa-clock mr-1"></i>' + new Date(asset.created_at).toLocaleString() + '</span>' +
              '      <a href="' + asset.file_url + '" download class="text-purple-600 hover:text-purple-700">' +
              '        <i class="fas fa-download"></i>' +
              '      </a>' +
              '    </div>' +
              '  </div>' +
              '</div>'
            ).join('');
          }

          // Download all functionality
          document.getElementById('downloadAllBtn').onclick = async () => {
            const response = await axios.get('/api/jobs/' + jobId + '/assets');
            const assets = response.data.assets.filter(a => !a.prohibited);
            
            for (const asset of assets) {
              const link = document.createElement('a');
              link.href = asset.file_url;
              link.download = 'ad-' + asset.id + '.png';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              await new Promise(resolve => setTimeout(resolve, 500)); // Delay between downloads
            }
          };

          // Start polling
          updateJobStatus();
          pollInterval = setInterval(updateJobStatus, 3000); // Poll every 3 seconds
        </script>
    </body>
    </html>
  `)
})

export default app
