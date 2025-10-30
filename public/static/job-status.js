// Job Status Page Handler
(function() {
  const loading = document.getElementById('loading');
  const jobContent = document.getElementById('jobContent');
  let pollInterval;

  // Load job status
  async function loadJobStatus() {
    try {
      const response = await fetch(`/api/jobs/${jobId}`);
      const job = await response.json();

      if (response.ok) {
        renderJobStatus(job);

        // If job is still processing, continue polling
        if (['queued', 'scraping', 'prompting', 'generating', 'saving'].includes(job.status)) {
          if (!pollInterval) {
            pollInterval = setInterval(loadJobStatus, 3000); // Poll every 3 seconds
          }
        } else {
          // Job is done or failed, stop polling
          if (pollInterval) {
            clearInterval(pollInterval);
            pollInterval = null;
          }
        }
      } else {
        throw new Error(job.error || 'Failed to load job');
      }

      loading.classList.add('hidden');
      jobContent.classList.remove('hidden');

    } catch (error) {
      loading.innerHTML = `
        <div class="text-red-600">
          <i class="fas fa-exclamation-triangle text-4xl mb-4"></i>
          <p>Error loading job: ${error.message}</p>
        </div>
      `;
    }
  }

  // Render job status
  function renderJobStatus(job) {
    const statusColors = {
      queued: 'bg-gray-100 text-gray-800',
      scraping: 'bg-blue-100 text-blue-800',
      prompting: 'bg-yellow-100 text-yellow-800',
      generating: 'bg-purple-100 text-purple-800',
      saving: 'bg-indigo-100 text-indigo-800',
      done: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800'
    };

    const statusIcons = {
      queued: 'fa-clock',
      scraping: 'fa-search',
      prompting: 'fa-brain',
      generating: 'fa-wand-magic-sparkles',
      saving: 'fa-save',
      done: 'fa-check-circle',
      failed: 'fa-times-circle'
    };

    const progress = job.total_ads > 0 
      ? Math.round((job.processed_ads / job.total_ads) * 100) 
      : 0;

    jobContent.innerHTML = `
      <!-- Status Card -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-2xl font-bold text-gray-800 mb-2">
              ${job.brand_name}
            </h2>
            <p class="text-gray-600 text-sm">${job.source_url}</p>
          </div>
          <div class="${statusColors[job.status]} px-4 py-2 rounded-full font-semibold uppercase text-sm">
            <i class="fas ${statusIcons[job.status]} mr-2"></i>
            ${job.status}
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="mb-6">
          <div class="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>${job.processed_ads} / ${job.total_ads} ads processed</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div class="bg-purple-600 h-4 transition-all duration-500 rounded-full" style="width: ${progress}%"></div>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-4">
          <div class="text-center p-4 bg-gray-50 rounded-lg">
            <div class="text-3xl font-bold text-gray-800">${job.total_ads}</div>
            <div class="text-sm text-gray-600">Total Ads</div>
          </div>
          <div class="text-center p-4 bg-green-50 rounded-lg">
            <div class="text-3xl font-bold text-green-600">${job.successful_ads}</div>
            <div class="text-sm text-gray-600">Successful</div>
          </div>
          <div class="text-center p-4 bg-red-50 rounded-lg">
            <div class="text-3xl font-bold text-red-600">${job.failed_ads}</div>
            <div class="text-sm text-gray-600">Failed</div>
          </div>
        </div>
      </div>

      <!-- Gallery -->
      ${renderGallery(job.assets || [])}

      <!-- Recent Events -->
      ${renderEvents(job.events || [])}
    `;
  }

  // Render gallery
  function renderGallery(assets) {
    if (assets.length === 0) {
      return `
        <div class="bg-white rounded-xl shadow-lg p-8 text-center text-gray-500">
          <i class="fas fa-images text-4xl mb-4"></i>
          <p>No images generated yet. Please wait...</p>
        </div>
      `;
    }

    const successfulAssets = assets.filter(a => !a.prohibited && a.file_url);

    return `
      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800">
            <i class="fas fa-images mr-2"></i>
            Generated Creatives (${successfulAssets.length})
          </h2>
          ${successfulAssets.length > 0 ? `
            <button onclick="downloadAll()" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
              <i class="fas fa-download mr-2"></i>
              Download All
            </button>
          ` : ''}
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${assets.map(asset => renderAssetCard(asset)).join('')}
        </div>
      </div>
    `;
  }

  // Render single asset card
  function renderAssetCard(asset) {
    if (asset.prohibited) {
      return `
        <div class="border-2 border-red-300 rounded-lg p-4 bg-red-50">
          <div class="text-center text-red-600">
            <i class="fas fa-ban text-4xl mb-2"></i>
            <p class="text-sm font-semibold">Prohibited Content</p>
            <p class="text-xs mt-1">Flagged by safety filters</p>
          </div>
        </div>
      `;
    }

    if (!asset.file_url) {
      return `
        <div class="border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
          <div class="text-center text-gray-500">
            <i class="fas fa-spinner fa-spin text-4xl mb-2"></i>
            <p class="text-sm">Generating...</p>
          </div>
        </div>
      `;
    }

    return `
      <div class="border-2 border-gray-200 rounded-lg overflow-hidden hover:border-purple-400 transition group">
        <div class="relative">
          <img src="${asset.file_url}" alt="Generated Ad" class="w-full h-64 object-cover">
          <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
            <a href="${asset.file_url}" download class="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
              <i class="fas fa-download mr-2"></i>
              Download
            </a>
          </div>
        </div>
        <div class="p-4 bg-white">
          <button 
            onclick="toggleFavorite('${asset.id}', ${asset.favorited})" 
            class="text-sm ${asset.favorited ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-500 transition"
          >
            <i class="fas fa-star mr-1"></i>
            ${asset.favorited ? 'Favorited' : 'Favorite'}
          </button>
        </div>
      </div>
    `;
  }

  // Render events log
  function renderEvents(events) {
    if (events.length === 0) return '';

    const levelColors = {
      info: 'text-blue-600 bg-blue-50',
      warn: 'text-yellow-600 bg-yellow-50',
      error: 'text-red-600 bg-red-50'
    };

    const levelIcons = {
      info: 'fa-info-circle',
      warn: 'fa-exclamation-triangle',
      error: 'fa-times-circle'
    };

    return `
      <div class="bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">
          <i class="fas fa-list mr-2"></i>
          Recent Events
        </h2>
        <div class="space-y-2">
          ${events.slice(0, 10).map(event => `
            <div class="flex items-start gap-3 p-3 rounded-lg ${levelColors[event.level]}">
              <i class="fas ${levelIcons[event.level]} mt-1"></i>
              <div class="flex-1">
                <p class="text-sm font-medium">${event.message}</p>
                <p class="text-xs opacity-75 mt-1">${new Date(event.created_at).toLocaleTimeString()}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Toggle favorite
  window.toggleFavorite = async function(assetId, currentState) {
    try {
      const response = await fetch(`/api/jobs/${jobId}/assets/${assetId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          favorited: !currentState
        })
      });

      if (response.ok) {
        loadJobStatus(); // Refresh
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  // Download all (placeholder - in production, would create ZIP)
  window.downloadAll = function() {
    alert('Batch download feature coming soon! For now, download images individually.');
  };

  // Start loading
  loadJobStatus();
})();
