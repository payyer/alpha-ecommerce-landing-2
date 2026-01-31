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
});