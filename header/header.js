fetch("/header/header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;

    const menuBtn = document.getElementById("menu-btn");
    const menuIcon = menuBtn.querySelector(".material-icons");
    const mobileMenu = document.getElementById("mobile-menu");

    let menuOpen = false;

    // Ensure initial closed state
    mobileMenu.style.maxHeight = "0px";
    mobileMenu.style.overflow = "hidden";

    // Toggle Mobile Menu
    menuBtn.addEventListener("click", () => {
      menuOpen = !menuOpen;

      menuIcon.textContent = menuOpen ? "close" : "menu";

      if (menuOpen) {
        mobileMenu.style.maxHeight = "85vh";
      } else {
        mobileMenu.style.maxHeight = "0px";
      }
    });

    // Close menu when clicking any mobile link
    document.querySelectorAll("#mobile-menu a").forEach(link => {
      link.addEventListener("click", () => {
        menuOpen = false;
        menuIcon.textContent = "menu";
        mobileMenu.style.maxHeight = "0px";
      });
    });

    // Click outside to close
    document.addEventListener("click", e => {
      if (!e.target.closest("header") && menuOpen) {
        menuOpen = false;
        menuIcon.textContent = "menu";
        mobileMenu.style.maxHeight = "0px";
      }
    });

    // Reset on window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        menuOpen = false;
        menuIcon.textContent = "menu";
        mobileMenu.style.maxHeight = "0px";
      }
    });

    // ===== REPLACE SERVICES WITH OUR SOLUTIONS (NON-EXPANDABLE) =====
    replaceServicesWithSolutions();
    
    // ===== SET ACTIVE NAV ITEM =====
    setActiveNavItem();
  });

// Function to replace "Services" dropdown with "Our Solutions" link
function replaceServicesWithSolutions() {
  // DESKTOP: Replace dropdown button with simple link
  const desktopServicesItem = document.querySelector('#header .group');
  if (desktopServicesItem) {
    const servicesButton = desktopServicesItem.querySelector('button');
    if (servicesButton) {
      // Create new link element
      const newLink = document.createElement('a');
      newLink.href = '../solutions.html'; // Change this to your solutions page URL
      newLink.className = 'font-quicksand relative px-4 py-2.5 rounded-3xl hover:bg-[#BDE6CF] transition-all duration-300 ease-in-out group';
      newLink.innerHTML = `
        Our Solutions
        <span class="absolute left-1/2 -translate-x-1/2 -bottom-1 h-0.5 w-0 bg-[#26AF93] group-hover:w-5 transition-all duration-300"></span>
      `;
      
      // Replace the button with the link
      servicesButton.replaceWith(newLink);
      
      // Remove the dropdown menu
      const dropdownMenu = desktopServicesItem.querySelector('ul');
      if (dropdownMenu) {
        dropdownMenu.remove();
      }
    }
  }

  // MOBILE: Replace expandable services with simple link
  const mobileServicesContainer = document.querySelector('#mobile-menu .px-5.py-3.rounded-3xl');
  if (mobileServicesContainer) {
    const servicesButton = document.getElementById('mobile-services-btn');
    const servicesMenu = document.getElementById('mobile-services-menu');
    
    if (servicesButton) {
      // Create new link element
      const newLink = document.createElement('a');
      newLink.href = '../solutions.html'; // Change this to your solutions page URL
      newLink.className = 'block px-5 py-3 rounded-3xl hover:bg-[#F2F9F6]';
      newLink.textContent = 'Our Solutions';
      
      // Replace the entire container
      mobileServicesContainer.replaceWith(newLink);
    }
    
    // Remove the dropdown menu if it exists
    if (servicesMenu) {
      servicesMenu.remove();
    }
  }
}

// Function to set active nav item based on current URL
function setActiveNavItem() {
  const currentPath = window.location.pathname.toLowerCase();
  
  // Remove any existing active classes first
  document.querySelectorAll('#header a').forEach(el => {
    el.classList.remove('text-[#26AF93]', 'font-semibold', 'bg-[#DDF3E7]');
    const underline = el.querySelector('span.absolute');
    if (underline) {
      underline.classList.remove('!w-5');
    }
  });

  // Desktop menu links
  const desktopLinks = document.querySelectorAll('#header ul.hidden.md\\:flex a[href]');
  desktopLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    const cleanHref = href.replace('../', '').replace('./', '').toLowerCase();
    const cleanPath = currentPath.replace(/^\//, '').toLowerCase();
    
    if (cleanPath && cleanHref && (cleanPath.includes(cleanHref) || cleanHref.includes(cleanPath))) {
      link.classList.add('text-[#26AF93]', 'font-semibold');
      const underline = link.querySelector('span.absolute');
      if (underline) {
        underline.classList.add('!w-5');
      }
    }
  });

  // Mobile menu links
  const mobileLinks = document.querySelectorAll('#mobile-menu a[href]');
  mobileLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    
    const cleanHref = href.replace('../', '').replace('./', '').toLowerCase();
    const cleanPath = currentPath.replace(/^\//, '').toLowerCase();
    
    if (cleanPath && cleanHref && (cleanPath.includes(cleanHref) || cleanHref.includes(cleanPath))) {
      link.classList.add('text-[#26AF93]', 'font-semibold', 'bg-[#DDF3E7]');
    }
  });

  // Handle Products page
  if (currentPath.includes('product')) {
    const productsLinks = document.querySelectorAll('a[href*="product.html"]');
    productsLinks.forEach(link => {
      link.classList.add('text-[#26AF93]', 'font-semibold');
      const underline = link.querySelector('span.absolute');
      if (underline) {
        underline.classList.add('!w-5');
      }
      if (link.closest('#mobile-menu')) {
        link.classList.add('bg-[#DDF3E7]');
      }
    });
  }

  // Handle Careers page
  if (currentPath.includes('career') || currentPath.includes('layout3')) {
    const careersLinks = document.querySelectorAll('a[href*="layout3.html"], a[href*="career.html"]');
    careersLinks.forEach(link => {
      link.classList.add('text-[#26AF93]', 'font-semibold');
      const underline = link.querySelector('span.absolute');
      if (underline) {
        underline.classList.add('!w-5');
      }
      if (link.closest('#mobile-menu')) {
        link.classList.add('bg-[#DDF3E7]');
      }
    });
  }

  // Handle Contact page
  if (currentPath.includes('contact') || currentPath.includes('layout1')) {
    const contactLinks = document.querySelectorAll('a[href*="layout1.html"], a[href*="contact.html"]');
    contactLinks.forEach(link => {
      link.classList.add('text-[#26AF93]', 'font-semibold');
      const underline = link.querySelector('span.absolute');
      if (underline) {
        underline.classList.add('!w-5');
      }
      if (link.closest('#mobile-menu')) {
        link.classList.add('bg-[#DDF3E7]');
      }
    });
  }

  // Handle Our Solutions page
  if (currentPath.includes('solutions')) {
    const solutionsLinks = document.querySelectorAll('a[href*="solutions.html"]');
    solutionsLinks.forEach(link => {
      link.classList.add('text-[#26AF93]', 'font-semibold');
      const underline = link.querySelector('span.absolute');
      if (underline) {
        underline.classList.add('!w-5');
      }
      if (link.closest('#mobile-menu')) {
        link.classList.add('bg-[#DDF3E7]');
      }
    });
  }
}