// Job Form Handler
(function() {
  const form = document.getElementById('jobForm');
  const fileInput = document.getElementById('productImage');
  const imagePreview = document.getElementById('imagePreview');
  const previewImg = document.getElementById('previewImg');
  const submitBtn = document.getElementById('submitBtn');
  const submitText = document.getElementById('submitText');
  const statusMessage = document.getElementById('statusMessage');

  // Image preview
  fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        previewImg.src = event.target.result;
        imagePreview.classList.remove('hidden');
      };
      reader.readAsDataURL(file);
    }
  });

  // Form submission
  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Disable submit button
    submitBtn.disabled = true;
    submitText.textContent = 'Creating Job...';

    // Get form values
    const sourceUrl = document.getElementById('sourceUrl').value;
    const brandName = document.getElementById('brandName').value;
    const maxAds = parseInt(document.getElementById('maxAds').value);
    const batchSize = parseInt(document.getElementById('batchSize').value);
    const file = fileInput.files[0];

    if (!file) {
      showError('Please upload a product image');
      submitBtn.disabled = false;
      submitText.textContent = 'Generate Inspired Creatives';
      return;
    }

    try {
      // Convert image to base64
      const base64Image = await fileToBase64(file);

      // Create job
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sourceUrl,
          brandName,
          productImage: base64Image,
          maxAds,
          batchSize
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create job');
      }

      // Success! Redirect to job status page
      showSuccess('Job created successfully! Redirecting...');
      
      setTimeout(() => {
        window.location.href = `/jobs/${data.jobId}`;
      }, 1000);

    } catch (error) {
      showError(error.message);
      submitBtn.disabled = false;
      submitText.textContent = 'Generate Inspired Creatives';
    }
  });

  // Helper: Convert file to base64
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Helper: Show error message
  function showError(message) {
    statusMessage.className = 'mt-4 p-4 rounded-lg bg-red-100 border border-red-400 text-red-700';
    statusMessage.innerHTML = `<i class="fas fa-exclamation-circle mr-2"></i>${message}`;
    statusMessage.classList.remove('hidden');
  }

  // Helper: Show success message
  function showSuccess(message) {
    statusMessage.className = 'mt-4 p-4 rounded-lg bg-green-100 border border-green-400 text-green-700';
    statusMessage.innerHTML = `<i class="fas fa-check-circle mr-2"></i>${message}`;
    statusMessage.classList.remove('hidden');
  }
})();
