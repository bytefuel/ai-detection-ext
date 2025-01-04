// Keep track of already processed posts
const processedPosts = new Set();

// Function to handle the AI detection and display logic for a post
async function processPost(post) {
    const postText = post.innerText;
    if (processedPosts.has(postText)) {
        return; // Skip already processed post
    } else {
        processedPosts.add(postText);
    }

    try {
        const response = await fetch('http://localhost:3000/detect-ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: postText }),
        });

        const result = await response.json();

        if (result && typeof result.ai_score === 'number' && typeof result.human_score === 'number') {
            const aiPercentage = Math.round(result.ai_score * 100);
            const humanPercentage = Math.round(result.human_score * 100);
            const postContainer = post.closest('.feed-shared-update-v2');
            // Create and append the tag to show the AI and Human percentages
            const tag = document.createElement('div');
            tag.style.position = 'absolute';
            tag.style.top = '10px';
            tag.style.right = '10px';
            tag.style.background = 'rgba(0, 0, 0, 0.8)';
            tag.style.color = '#fff';
            tag.style.padding = '5px 10px';
            tag.style.borderRadius = '5px';
            tag.style.cursor = 'pointer';
            tag.innerHTML = `
                AI: ${aiPercentage}% | Human: ${humanPercentage}%
                <small style="display: block; font-size: 10px;">*Results are estimates</small>
            `;

            // Add event listener for tag click to show detailed popover
            tag.addEventListener('click', () => {
                const postContainers = post.closest('.feed-shared-update-v2');
                const existingPopover = postContainers.querySelector('.ai-popover');
                if (existingPopover) {
                    // Remove the popover if it already exists
                    existingPopover.remove();
                    return;
                }

                // Create the popover if it doesn't exist
                const popover = document.createElement('div');
                popover.className = 'ai-popover';
                popover.style.position = 'absolute';
                popover.style.top = '0'; // Align with the top of the post
                popover.style.left = '580px'; // Position to the right of the post container
                popover.style.background = '#fff';
                popover.style.color = '#000';
                popover.style.border = '1px solid #ccc';
                popover.style.padding = '10px';
                popover.style.borderRadius = '5px';
                popover.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                popover.style.zIndex = '100';
                popover.style.width = '220px'; // Optional: Set a fixed width for consistency
                popover.innerHTML = `
        <strong>Analysis:</strong><br>
        Text is likely <strong>${result.result}</strong><br>
        <small>AI Score: ${aiPercentage}%</small><br>
        <small>Human Score: ${humanPercentage}%</small><br>
        <small style="color: #888;">*This analysis is not 100% accurate</small>
    `;

                // Add click event to remove the popover when clicked again
                popover.addEventListener('click', () => {
                    popover.remove();
                });

                // Append the popover to the post's container
                const postContainer = post.closest('.feed-shared-update-v2');
                if (postContainer) {
                    postContainer.style.position = 'relative'; // Ensure the container is relatively positioned
                    postContainer.appendChild(popover);
                }
            });



            
            if (postContainer) {
                postContainer.style.position = 'relative';
                postContainer.appendChild(tag);
            }
        }
    } catch (err) {
        console.error('Error fetching AI classification:', err);
    }
}

// Function to check and process visible posts
function checkAndProcessVisiblePosts() {
    const posts = document.querySelectorAll('.feed-shared-update-v2__description');
    posts.forEach(post => {
        if (isElementInViewport(post)) {
            processPost(post);
        }
    });
}

// Function to check if an element is in the viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to handle the scroll event
function handleScroll() {
    checkAndProcessVisiblePosts();
}

// Attach the scroll event listener
window.addEventListener('scroll', handleScroll);

// Initial call to process posts already visible when the page loads
checkAndProcessVisiblePosts();
