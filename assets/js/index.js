var appsPerPage = 5;
var currentPage = 1;

function displayApps() {
    var appListDiv = document.getElementById('appList');
    var paginationDiv = document.getElementById('pagination');
    var appTemplate = document.getElementById('appTemplate').innerHTML;

    // Fetch JSON data from the server
    fetch('https://lmadminpanel.000webhostapp.com/getdata.php')
        .then(response => response.json())
        .then(jsonData => {
            // Check if there is no data
            if (jsonData.length === 0) {
                appListDiv.innerHTML = '<p>NO APPS TO SHOW JOIN OUR TELEGRAM FOR UPDATE <a href="https://t.me/leakedmodapk" target="_blank" class="btn btn-primary" style="margin-top: 20px;">LEAKED MOD APK</a></p>';
                paginationDiv.innerHTML = '';
                return;
            }

            // Calculate start and end index for the current page
            var startIndex = (currentPage - 1) * appsPerPage;
            var endIndex = startIndex + appsPerPage;

            // Get apps for the current page
            var appsOnPage = jsonData.slice(startIndex, endIndex);

            // Clear previous content
            appListDiv.innerHTML = '';

            // Loop through each app on the current page
            for (var i = 0; i < appsOnPage.length; i++) {
                var app = appsOnPage[i];

                // Create a copy of the template
                var appDiv = document.createElement('div');
                appDiv.innerHTML = appTemplate;

                // Update specific parts of the template
                appDiv.querySelector('.app-image').src = app.img;
                appDiv.querySelector('.app-image').alt = app.name;
                appDiv.querySelector('.app-name').textContent = app.name;
                // Update the download link
                var downloadLink = appDiv.querySelector('.download-link');
                downloadLink.href = `post.html?id=${app.id}`;
                downloadLink.target = '_blank';

                // Append the appDiv to the appListDiv
                appListDiv.appendChild(appDiv);
            }

            // Create pagination links
            var totalPages = Math.ceil(jsonData.length / appsPerPage);
            paginationDiv.innerHTML = '';
            for (var page = 1; page <= totalPages; page++) {
                var pageLink = document.createElement('a');
                pageLink.href = '#';
                pageLink.textContent = page;
                pageLink.addEventListener('click', function (e) {
                    e.preventDefault();
                    currentPage = parseInt(e.target.textContent);
                    displayApps();
                });
                paginationDiv.appendChild(pageLink);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Call the displayApps function when the page loads
window.onload = displayApps;
