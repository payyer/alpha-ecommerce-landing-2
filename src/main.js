import './assets/styles/main.css';

// ========================================
// Mobile Menu Toggle Logic
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggleBtn = document.getElementById('mobile-menu-toggle');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuSidebar = document.getElementById('mobile-menu-sidebar');

    let isMenuOpen = false;

    // Function to open mobile menu
    const openMobileMenu = () => {
        // Toggle icons: hide hamburger, show close
        hamburgerIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');

        // First, show overlay with fade-in effect
        mobileMenuOverlay.classList.remove('invisible', 'opacity-0');
        mobileMenuOverlay.classList.add('opacity-100');

        // Then, slide in sidebar from left to right after a tiny delay
        setTimeout(() => {
            mobileMenuSidebar.classList.remove('-translate-x-full');
            mobileMenuSidebar.classList.add('translate-x-0');
        }, 50); // Small delay to ensure overlay starts fading first

        // Prevent body scroll when menu is open
        document.body.style.overflow = 'hidden';

        isMenuOpen = true;
    };

    // Function to close mobile menu
    const closeMobileMenu = () => {
        // Toggle icons: hide close, show hamburger
        closeIcon.classList.add('hidden');
        hamburgerIcon.classList.remove('hidden');

        // First, slide out sidebar
        mobileMenuSidebar.classList.remove('translate-x-0');
        mobileMenuSidebar.classList.add('-translate-x-full');

        // Then, fade out overlay after sidebar animation completes
        setTimeout(() => {
            mobileMenuOverlay.classList.remove('opacity-100');
            mobileMenuOverlay.classList.add('opacity-0', 'invisible');
        }, 300); // Match the sidebar transition duration

        // Restore body scroll
        document.body.style.overflow = '';

        isMenuOpen = false;
    };

    // Toggle function
    const toggleMobileMenu = () => {
        if (isMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    };

    // Event listener for toggle button
    if (mobileMenuToggleBtn) {
        mobileMenuToggleBtn.addEventListener('click', toggleMobileMenu);
    }

    // Close menu when clicking on overlay
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close menu on ESC key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
        }
    });
    // Currency symbol mapping
    const currencySymbols = {
        'AUD': '$',
        'EUR': '€',
        'CAD': '$',
        'HKD': '$',
        'HUF': 'Ft',
        'IDR': 'Rp',
        'ILS': '₪',
        'JPY': '¥',
        'MYR': 'RM',
        'NZD': '$',
        'PHP': '₱',
        'PLN': 'zł',
        'SGD': '$',
        'KRW': '₩',
        'SEK': 'kr',
        'CHF': 'CHF',
        'TWD': '$',
        'AED': 'د.إ',
        'GBP': '£',
        'USD': '$'
    };

    // ========================================
    // Country Selection Modal Logic
    // ========================================
    const countryModalOpenBtn = document.getElementById('currency-selector-open');
    const countryModalCloseBtn = document.getElementById('country-modal-close');
    const countryModalOverlay = document.getElementById('country-modal-overlay');
    const countryModal = document.getElementById('country-modal');
    const countrySearchInput = document.getElementById('country-search');
    const countryItems = document.querySelectorAll('.country-item');

    const openCountryModal = () => {
        countryModalOverlay.classList.remove('invisible', 'opacity-0');
        countryModalOverlay.classList.add('opacity-100');
        countryModal.classList.remove('translate-y-full');
        countryModal.classList.add('translate-y-0');
        document.body.style.overflow = 'hidden';
    };

    const closeCountryModal = () => {
        countryModal.classList.remove('translate-y-0');
        countryModal.classList.add('translate-y-full');
        setTimeout(() => {
            countryModalOverlay.classList.remove('opacity-100');
            countryModalOverlay.classList.add('opacity-0', 'invisible');
        }, 500); // Match country-modal duration
        // Only restore scroll if mobile menu is also closed
        if (!isMenuOpen) {
            document.body.style.overflow = '';
        }
    };

    if (countryModalOpenBtn) {
        countryModalOpenBtn.addEventListener('click', openCountryModal);
    }
    if (countryModalCloseBtn) {
        countryModalCloseBtn.addEventListener('click', closeCountryModal);
    }
    if (countryModalOverlay) {
        countryModalOverlay.addEventListener('click', closeCountryModal);
    }

    // Country Selection Filtering & Switching
    if (countrySearchInput) {
        countrySearchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            countryItems.forEach(item => {
                const countryName = item.getAttribute('data-country').toLowerCase();
                const currency = item.getAttribute('data-currency').toLowerCase();
                if (countryName.includes(searchTerm) || currency.includes(searchTerm)) {
                    item.classList.remove('hidden');
                    item.classList.add('flex');
                } else {
                    item.classList.add('hidden');
                    item.classList.remove('flex');
                }
            });
        });
    }

    // Handle Country Selection Click
    const currencyCodeEl = document.getElementById('currency-code');
    const headerCurrencyCodeEl = document.getElementById('header-currency-code');
    countryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            countryItems.forEach(el => el.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');

            // Update Header Currency Text
            const currencyData = item.getAttribute('data-currency');
            // Extract the currency code (first 3 letters, e.g., "USD" from "USD $")
            const code = currencyData.split(' ')[0];
            if (currencyCodeEl) {
                currencyCodeEl.textContent = code;
            }
            // Also update the PC header currency code
            if (headerCurrencyCodeEl) {
                headerCurrencyCodeEl.textContent = code;
            }

            // Close Modal with slight delay
            setTimeout(closeCountryModal, 300);
        });
    });
    // ========================================
    // Cart Drawer Logic
    // ========================================
    const cartDrawerOpenBtn = document.getElementById('cart-drawer-open');
    const cartDrawerCloseBtn = document.getElementById('cart-drawer-close');
    const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
    const cartDrawer = document.getElementById('cart-drawer');

    const openCartDrawer = () => {
        cartDrawerOverlay.classList.remove('invisible', 'opacity-0');
        cartDrawerOverlay.classList.add('opacity-100', 'active');
        cartDrawer.classList.remove('translate-x-full', 'tablet:translate-x-[calc(100%+24px)]');
        cartDrawer.classList.add('translate-x-0');
        document.body.style.overflow = 'hidden';
    };

    const closeCartDrawer = () => {
        cartDrawer.classList.remove('translate-x-0');
        cartDrawer.classList.add('translate-x-full', 'tablet:translate-x-[calc(100%+24px)]');
        setTimeout(() => {
            cartDrawerOverlay.classList.remove('opacity-100', 'active');
            cartDrawerOverlay.classList.add('opacity-0', 'invisible');
        }, 500); // Match cart-drawer transition duration

        // Restore scroll only if mobile menu is closed
        if (!isMenuOpen) {
            document.body.style.overflow = '';
        }
    };

    if (cartDrawerOpenBtn) cartDrawerOpenBtn.addEventListener('click', openCartDrawer);
    if (cartDrawerCloseBtn) cartDrawerCloseBtn.addEventListener('click', closeCartDrawer);
    if (cartDrawerOverlay) cartDrawerOverlay.addEventListener('click', closeCartDrawer);

    // Quantity Selector Logic
    const qtyValueEl = document.getElementById('qty-value');
    const qtyMinusBtn = document.getElementById('qty-minus');
    const qtyPlusBtn = document.getElementById('qty-plus');

    if (qtyValueEl && qtyMinusBtn && qtyPlusBtn) {
        let currentQty = parseInt(qtyValueEl.textContent);

        qtyMinusBtn.addEventListener('click', () => {
            if (currentQty > 1) {
                currentQty--;
                qtyValueEl.textContent = currentQty;
            }
        });

        qtyPlusBtn.addEventListener('click', () => {
            currentQty++;
            qtyValueEl.textContent = currentQty;
        });
    }
    // ========================================
    // Shop Hover Sidebar (PC Only)
    // ========================================
    const navShop = document.getElementById('nav-shop');

    console.log('Nav Shop Element:', navShop);
    console.log('Mobile Menu Sidebar:', mobileMenuSidebar);

    if (navShop && mobileMenuSidebar) {
        let hoverTimeout;

        const showShopSidebar = () => {
            console.log('showShopSidebar called, window width:', window.innerWidth);
            if (window.innerWidth >= 990) { // PC Breakpoint
                clearTimeout(hoverTimeout);
                mobileMenuSidebar.classList.add('pc-active');
                console.log('pc-active class added');
            }
        };

        const hideShopSidebar = () => {
            console.log('hideShopSidebar called');
            if (window.innerWidth >= 990) {
                hoverTimeout = setTimeout(() => {
                    if (!mobileMenuSidebar.matches(':hover') && !navShop.matches(':hover')) {
                        mobileMenuSidebar.classList.remove('pc-active');
                        console.log('pc-active class removed');
                    }
                }, 150);
            }
        };

        navShop.addEventListener('mouseenter', showShopSidebar);
        navShop.addEventListener('mouseleave', hideShopSidebar);
        mobileMenuSidebar.addEventListener('mouseenter', showShopSidebar);
        mobileMenuSidebar.addEventListener('mouseleave', hideShopSidebar);

        console.log('Shop hover events attached');
    } else {
        console.error('navShop or mobileMenuSidebar not found!');
    }

    // ========================================
    // Header Currency Button → Country Modal (PC Only)
    // ========================================
    const headerCurrencySelector = document.getElementById('header-currency-selector');
    const headerCurrencyCode = document.getElementById('header-currency-code');
    const pcCurrencyDropdown = document.getElementById('pc-currency-dropdown');
    const pcCurrencySearch = document.getElementById('pc-currency-search');
    const pcCountryItems = document.querySelectorAll('.pc-country-item');

    if (headerCurrencySelector && pcCurrencyDropdown) {
        // Toggle PC dropdown when clicking header currency button
        headerCurrencySelector.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = !pcCurrencyDropdown.classList.contains('invisible');

            if (isVisible) {
                pcCurrencyDropdown.classList.add('opacity-0', 'invisible');
            } else {
                pcCurrencyDropdown.classList.remove('opacity-0', 'invisible');
                // Focus on search input when opening
                if (pcCurrencySearch) {
                    pcCurrencySearch.focus();
                }
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!headerCurrencySelector.contains(e.target) && !pcCurrencyDropdown.contains(e.target)) {
                pcCurrencyDropdown.classList.add('opacity-0', 'invisible');
            }
        });

        // Search functionality for PC dropdown
        if (pcCurrencySearch) {
            pcCurrencySearch.addEventListener('input', () => {
                const searchTerm = pcCurrencySearch.value.toLowerCase();
                pcCountryItems.forEach(item => {
                    const countryName = item.getAttribute('data-country').toLowerCase();
                    if (countryName.includes(searchTerm)) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        }

        // Convert any plain button items to include checkmark structure
        pcCountryItems.forEach(item => {
            // Check if item doesn't already have checkmark structure
            if (!item.querySelector('.country-checkmark')) {
                const countryName = item.textContent.trim();
                const currency = item.getAttribute('data-currency');
                const symbol = currencySymbols[currency] || '';

                item.innerHTML = `
                    <div class="flex items-center justify-between w-full">
                        <div class="flex items-center">
                            <span class="country-checkmark">
                                <svg class="icon icon-checkmark" width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.35.643a.5.5 0 01.006.707l-6.77 6.886a.5.5 0 01-.719-.006L.638 4.845a.5.5 0 11.724-.69l2.872 3.011 6.41-6.517a.5.5 0 01.707-.006h-.001z" fill="currentColor"></path>
                                </svg>
                            </span>
                            <span>${countryName}</span>
                        </div>
                        <span class="country-currency">${currency} ${symbol}</span>
                    </div>
                `;
                // Add necessary classes
                item.classList.add('country-item-btn', 'country-item');
            } else {
                // If already has checkmark, just add currency symbol if not present
                if (!item.querySelector('.country-currency')) {
                    const currency = item.getAttribute('data-currency');
                    const symbol = currencySymbols[currency] || '';
                    const flexDiv = item.querySelector('.flex.items-center');
                    if (flexDiv) {
                        // Wrap existing content and add currency
                        const parent = flexDiv.parentElement;
                        const wrapper = document.createElement('div');
                        wrapper.className = 'flex items-center justify-between w-full';
                        wrapper.innerHTML = flexDiv.outerHTML + `<span class="country-currency">${currency} ${symbol}</span>`;
                        parent.replaceChild(wrapper, flexDiv);
                    }
                }
            }
        });

        // Handle country selection in PC dropdown
        pcCountryItems.forEach(item => {
            item.addEventListener('click', () => {
                const currency = item.getAttribute('data-currency');

                // Update header currency code
                if (headerCurrencyCode) {
                    headerCurrencyCode.textContent = currency;
                }
                // Also update sidebar currency code
                if (currencyCodeEl) {
                    currencyCodeEl.textContent = currency;
                }

                // Update active state
                pcCountryItems.forEach(el => el.classList.remove('active'));
                item.classList.add('active');

                // Close dropdown
                pcCurrencyDropdown.classList.add('opacity-0', 'invisible');
            });
        });

        console.log('PC currency dropdown initialized');
    }

    // ========================================
    // Hero Product Swiper Logic
    // ========================================
    const heroImageModal = document.getElementById('hero-image-modal');
    const heroImageModalImg = document.getElementById('hero-image-modal-img');
    const heroImageModalClose = document.getElementById('hero-image-modal-close');

    // ========================================
    // Hero Product Swiper Logic
    // ========================================

    // 1. Initialize Thumbs Swiper
    const heroThumbsSwiper = new Swiper('.hero-thumbs', {
        spaceBetween: 12, // Gap between thumbs
        slidesPerView: 'auto',
        freeMode: true,
        watchSlidesProgress: true,
        direction: 'vertical', // Dọc bên trái
        allowTouchMove: false, // Disable drag/swipe, only allow navigation buttons
        navigation: {
            nextEl: '#thumbs-next',
            prevEl: '#thumbs-prev',
        },
    });

    // 2. Initialize Main Swiper with Thumbs
    const heroProductSwiper = new Swiper('.hero-product-swiper', {
        slidesPerView: 1,
        spaceBetween: 0,
        // Improved click handling
        preventClicks: true,
        preventClicksPropagation: true,
        slideToClickedSlide: false,
        thumbs: {
            swiper: heroThumbsSwiper,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            bulletClass: 'swiper-pagination-bullet hero-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active hero-bullet-active',
        },
        // Breakpoint logic
        breakpoints: {
            // Mobile (default)
            0: {
                allowTouchMove: true,
                speed: 300, // Standard slide speed on mobile
            },
            // PC/Tablet (750px+)
            750: {
                allowTouchMove: false, // Disable swipe on PC
                speed: 0, // Instant transition on PC
            }
        },
        on: {
            init: function () {
                console.log('Hero Product Swiper initialized');
            },
            // Use Swiper's built-in click event which handles drag vs tap
            click: function (swiper, event) {
                // Find closest swiper-slide from the click event target
                const slide = event.target.closest('.swiper-slide');
                if (slide) {
                    const img = slide.querySelector('img');
                    if (img && heroImageModal && heroImageModalImg) {
                        heroImageModalImg.src = img.src;
                        heroImageModalImg.alt = img.alt || 'Product Image';
                        heroImageModal.classList.add('active');
                        document.body.style.overflow = 'hidden';
                        console.log('Modal opened (via Swiper click) with image:', img.src);
                    }
                }
            },
        },
    });

    // ========================================
    // Hero Image Modal Logic
    // ========================================

    // Close modal
    const closeHeroImageModal = () => {
        heroImageModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (heroImageModalClose) {
        heroImageModalClose.addEventListener('click', closeHeroImageModal);
    }

    if (heroImageModal) {
        heroImageModal.addEventListener('click', (e) => {
            if (e.target === heroImageModal) {
                closeHeroImageModal();
            }
        });
    }

    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && heroImageModal.classList.contains('active')) {
            closeHeroImageModal();
        }
    });

    // ========================================
    // Reusable Accordion Logic (Only one open at a time)
    // ========================================
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-accordion-trigger]');
        if (!trigger) return;

        e.preventDefault();
        const accordionItem = trigger.closest('.accordion-item');
        if (!accordionItem) return;

        // Find the accordion container (parent of all accordion items)
        const accordionContainer = accordionItem.closest('[data-accordion-container]');
        
        if (accordionContainer) {
            // Container exists - apply "only one open" logic
            const isActive = accordionItem.classList.contains('active');

            // Close all accordion items in the same container
            accordionContainer.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });

            // If the clicked item wasn't active, open it
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        } else {
            // No container - allow simple toggle (for standalone accordions)
            accordionItem.classList.toggle('active');
        }
    });

    // ========================================
    // Reusable Selection Logic (Format/Bundle)
    // ========================================
    document.addEventListener('click', (e) => {
        const option = e.target.closest('[data-select-item]');
        if (!option) return;

        const group = option.getAttribute('data-select-group');
        if (!group) return;

        // Find all items in the same group and remove active class
        document.querySelectorAll(`[data-select-group="${group}"]`).forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to the clicked item
        option.classList.add('active');
    });

    // ========================================
    // Ambassadors Video Swiper
    // ========================================
    const ambassadorsSwiper = new Swiper('.ambassadors-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 12,
        freeMode: true,
        loop: false,
        
    });

    // ========================================
    // Ambassador Video Modal Logic
    // ========================================
    const videoModal = document.getElementById('ambassador-video-modal');
    const videoPlayer = document.getElementById('ambassador-video-player');
    const closeButton = document.getElementById('ambassador-video-close');
    const muteButton = document.getElementById('ambassador-video-mute');

    let isVideoMuted = false; // Start unmuted as requested

    // Open modal when clicking on video slide
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-video-modal-trigger]');
        if (!trigger) return;

        const videoUrl = trigger.getAttribute('data-video-url');
        if (!videoUrl) return;

        // Set video source and open modal
        videoPlayer.querySelector('source').src = videoUrl;
        videoPlayer.load();
        
        // Ensure volume icons match state
        const mutedIcon = muteButton.querySelector('.muted-icon');
        const unmutedIcon = muteButton.querySelector('.unmuted-icon');
        
        if (isVideoMuted) {
            videoPlayer.muted = true;
            mutedIcon.classList.remove('hidden');
            unmutedIcon.classList.add('hidden');
        } else {
            videoPlayer.muted = false;
            mutedIcon.classList.add('hidden');
            unmutedIcon.classList.remove('hidden');
        }
        
        // Show modal with animation
        videoModal.classList.remove('invisible', 'opacity-0');
        videoModal.classList.add('visible', 'opacity-100');
        
        // Play video
        videoPlayer.play();
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    });

    // Toggle Play/Pause when clicking video container
    const videoContainer = document.getElementById('ambassador-video-container');
    const playOverlay = document.getElementById('video-play-overlay');

    videoContainer.addEventListener('click', (e) => {
        // Don't trigger if clicking the mute button specifically
        if (e.target.closest('#ambassador-video-mute')) return;

        if (videoPlayer.paused) {
            videoPlayer.play();
            playOverlay.classList.remove('opacity-100');
            playOverlay.classList.add('opacity-0');
        } else {
            videoPlayer.pause();
            playOverlay.classList.remove('opacity-0');
            playOverlay.classList.add('opacity-100');
        }
    });

    // Reset overlay state when video ends or modal opens
    videoPlayer.addEventListener('play', () => {
        playOverlay.classList.remove('opacity-100');
        playOverlay.classList.add('opacity-0');
    });

    // Close modal
    const closeVideoModal = () => {
        videoModal.classList.add('invisible', 'opacity-0');
        videoModal.classList.remove('visible', 'opacity-100');
        
        // Pause and reset video
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        
        // Reset play overlay for next time
        playOverlay.classList.remove('opacity-100');
        playOverlay.classList.add('opacity-0');
        
        // Restore body scroll
        document.body.style.overflow = '';
    };

    closeButton.addEventListener('click', closeVideoModal);

    // Close on backdrop click
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal || e.target.id === 'ambassador-video-backdrop') {
            closeVideoModal();
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('visible')) {
            closeVideoModal();
        }
    });

    // Mute/Unmute toggle
    muteButton.addEventListener('click', () => {
        isVideoMuted = !isVideoMuted;
        videoPlayer.muted = isVideoMuted;
        
        // Toggle icon visibility
        const mutedIcon = muteButton.querySelector('.muted-icon');
        const unmutedIcon = muteButton.querySelector('.unmuted-icon');
        
        if (isVideoMuted) {
            mutedIcon.classList.remove('hidden');
            unmutedIcon.classList.add('hidden');
        } else {
            mutedIcon.classList.add('hidden');
            unmutedIcon.classList.remove('hidden');
        }
    });

    // ========================================
    // Reviews Swiper - Marquee Style
    // ========================================
    if (typeof Swiper !== 'undefined') {
        const reviewsSwiper = new Swiper('.reviews-swiper', {
            slidesPerView: 'auto',
            spaceBetween: 15,
            loop: true,
            loopedSlides: 12, // Double the slides for bidirectional loop
            speed: 8000,
            grabCursor: true,
            allowTouchMove: true,
            watchSlidesProgress: true,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
            },
        });
        
        console.log('Reviews Swiper (marquee) initialized');
    } else {
        console.error('Swiper not loaded');
    }
});

// ===== ORGAN SYSTEMS INTERACTIVE SECTION =====

document.addEventListener('DOMContentLoaded', () => {
    const organSystemsSection = document.getElementById('organ-systems-section');
    if (!organSystemsSection) return;

    const toggleButtons = organSystemsSection.querySelectorAll('.organ-systems__toggle-btn');
    const contents = organSystemsSection.querySelectorAll('.organ-systems__content');
    
    // Data for all organ system cards with detailed information
    const organSystemsData = {
        essentials: [
            { title: 'Digestive Support', meta: 'Prebiotics, Probiotics, Postbiotics, Enzymes', description: 'A complete 4-tier digestive support system featuring 10 Billion CFU of probiotics and clinically proven enzymes to optimize nutrient absorption and gut health.' },
            { title: 'Immune Support', meta: 'Vitamin C, Zinc, Elderberry, Echinacea', description: 'Comprehensive immune defense featuring clinically dosed vitamins and powerful botanical extracts to support your body\'s natural immune response.' },
            { title: 'Cardiovascular Support', meta: 'CoQ10, Omega-3, L-Carnitine, Hawthorn', description: 'Supports heart health and circulation with essential nutrients and antioxidants that promote optimal cardiovascular function.' },
            { title: 'Muscular Support', meta: 'Essential Amino Acids, Creatine, HMB', description: 'Provides essential nutrients for muscle maintenance, recovery, and growth with clinically effective doses of key performance ingredients.' },
            { title: 'Skeletal Support', meta: 'Calcium, Vitamin D3, K2, Magnesium', description: 'Complete bone health formula with synergistic nutrients that support bone density, strength, and long-term skeletal integrity.' },
            { title: 'Integumentary Support', meta: 'Collagen, Biotin, Vitamin E, Hyaluronic Acid', description: 'Promotes healthy skin, hair, and nails with scientifically-backed ingredients that support structure, hydration, and renewal.' },
            { title: 'Nervous Support', meta: 'B-Complex, L-Theanine, Ashwagandha, Magnesium', description: 'Supports cognitive function, stress response, and nervous system health with adaptogens and essential neurological nutrients.' },
            { title: 'Endocrine Support', meta: 'Iodine, Selenium, Chromium, Adaptogens', description: 'Balances hormone production and supports glandular health with targeted nutrients for optimal endocrine system function.' },
            { title: 'Urinary Support', meta: 'Cranberry, D-Mannose, Uva Ursi, Dandelion', description: 'Promotes urinary tract health and kidney function with natural botanicals and compounds that support cleansing and protection.' }
        ],
        longevity: [
            { title: 'Cellular Cleansing Support', meta: 'Autophagy Activation', description: 'Activates the body\'s natural cellular cleanup process (autophagy) to remove damaged components and improve cellular efficiency.' },
            { title: 'Cellular Renewal Support', meta: 'Mitochondrial Biogenesis', description: 'Stimulates the creation of new mitochondria and promotes cellular regeneration for enhanced energy production and vitality.' },
            { title: 'Cellular Aging Support', meta: 'Senolytic Activation', description: 'Targets and eliminates senescent cells that accumulate with age, reducing inflammation and promoting tissue rejuvenation.' },
            { title: 'Youthful Aging Support', meta: 'NAD+ Optimization', description: 'Boosts NAD+ levels to support DNA repair, cellular energy, and the activation of longevity genes for healthy aging.' }
        ]
    };

    // Toggle Product Switch
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const product = btn.dataset.product;
            if (organSystemsSection.dataset.activeProduct === product) return;

            // Update active product
            organSystemsSection.dataset.activeProduct = product;

            // Update section class for background transition
            if (product === 'longevity') {
                organSystemsSection.classList.add('organ-systems--longevity');
                organSystemsSection.classList.remove('organ-systems--essentials');
            } else {
                organSystemsSection.classList.add('organ-systems--essentials');
                organSystemsSection.classList.remove('organ-systems--longevity');
            }

            // Update toggle buttons
            toggleButtons.forEach(b => {
                if (b.dataset.product === product) {
                    b.classList.add('organ-systems__toggle-btn--active');
                    b.setAttribute('aria-selected', 'true');
                } else {
                    b.classList.remove('organ-systems__toggle-btn--active');
                    b.setAttribute('aria-selected', 'false');
                }
            });

            // Switch content panels
            contents.forEach(content => {
                if (content.dataset.content === product) {
                    content.classList.add('organ-systems__content--active');
                } else {
                    content.classList.remove('organ-systems__content--active');
                }
            });
        });
    });

    // Card Selection and Detail Panel Update
    function setupCardInteractions(product) {
        const contentPanel = organSystemsSection.querySelector(`[data-content="${product}"]`);
        if (!contentPanel) return;

        const cards = contentPanel.querySelectorAll('.organ-card');
        const detailContents = contentPanel.querySelectorAll('.organ-detail__content');

        cards.forEach((card, index) => {
            card.addEventListener('click', () => {
                // Update active card
                cards.forEach(c => c.classList.remove('organ-card--active'));
                card.classList.add('organ-card--active');

                // Update detail panel content
                detailContents.forEach(detail => {
                    if (parseInt(detail.dataset.detail) === index) {
                        detail.classList.add('organ-detail__content--active');
                        
                        // Update detail content with data
                        const data = organSystemsData[product][index];
                        const title = detail.querySelector('h3');
                        const meta = detail.querySelector('.tracking-\\[0\\.18em\\]');
                        const description = detail.querySelector('p');
                        const number = detail.querySelector('.organ-detail__number');
                        
                        if (title) title.textContent = data.title;
                        if (meta) meta.textContent = data.meta;
                        if (description) description.textContent = data.description;
                        if (number) number.textContent = String(index + 1).padStart(2, '0');
                    } else {
                        detail.classList.remove('organ-detail__content--active');
                    }
                });
            });
        });
    }

    // Initialize card interactions for both products
    setupCardInteractions('essentials');
    setupCardInteractions('longevity');
});

// ========================================
// Fixed Bottom Bar: Variant Selector Dropdown
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const variantBtn = document.getElementById('variant-selector-btn');
    const variantDropdown = document.getElementById('variant-dropdown');
    const variantOptions = document.querySelectorAll('.variant-option');

    if (!variantBtn || !variantDropdown) return;

    // Toggle dropdown
    variantBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        variantDropdown.classList.toggle('hidden');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!variantBtn.contains(e.target) && !variantDropdown.contains(e.target)) {
            variantDropdown.classList.add('hidden');
        }
    });

    // Handle option selection
    variantOptions.forEach(option => {
        option.addEventListener('click', () => {
            const value = option.getAttribute('data-value');
            
            // Update button text based on selected option
            const btnTextContainer = variantBtn.querySelector('.flex.flex-col');
            
            if (value === '90-day') {
                btnTextContainer.innerHTML = `
                    <div class="font-bold text-[12px] tablet:text-[13px]">90-Day Supply</div>
                    <div class="text-[10px] tablet:text-[11px] opacity-70">$4.73 AUD / serving</div>
                `;
            } else if (value === '60-day') {
                btnTextContainer.innerHTML = `
                    <div class="font-bold text-[12px] tablet:text-[13px]">60-Day Supply</div>
                `;
            } else if (value === '30-day') {
                btnTextContainer.innerHTML = `
                    <div class="font-bold text-[12px] tablet:text-[13px]">30-Day Supply (Save 20%)</div>
                    <div class="text-[10px] tablet:text-[11px] opacity-70">$5.40 AUD / serving</div>
                `;
            }
            
            // Close dropdown
            variantDropdown.classList.add('hidden');
            
            console.log('Selected variant:', value);
        });
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !variantDropdown.classList.contains('hidden')) {
            variantDropdown.classList.add('hidden');
        }
    });
});

// ========================================
// Sticky Top Announcement Bar (Show on Scroll)
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const stickyTopBar = document.getElementById('sticky-top-bar');
    if (!stickyTopBar) return;

    let lastScrollY = window.scrollY;
    const scrollThreshold = 100; // Show bar after scrolling 100px

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > scrollThreshold) {
            // Show sticky bar when scrolled down
            stickyTopBar.classList.remove('-translate-y-full');
            stickyTopBar.classList.add('translate-y-0');
        } else {
            // Hide sticky bar when at top
            stickyTopBar.classList.remove('translate-y-0');
            stickyTopBar.classList.add('-translate-y-full');
        }

        lastScrollY = currentScrollY;
    };

    // Throttle scroll event for better performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
});
