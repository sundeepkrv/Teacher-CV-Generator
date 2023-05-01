// (function() {
  // "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 10
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('fa-bars')
    this.classList.toggle('fa-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('fa-bars')
        navbarToggle.classList.toggle('fa-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

// })();
    function preview() {
        var fileSize = event.target.files[0].size/1024/1024;
        var ext = document.getElementById('photo').value.split('.').pop().toLowerCase();
        if (fileSize < 0.009) {
            Swal.fire({ icon: 'warning', html: 'Photo is too small!!! Size should be more than 10 KB.' });
        } else if (fileSize > 1) {
            Swal.fire({ icon: 'warning', html: 'Photo is too big!!! Size should be less than 1 MB.' });
        } else if (ext != 'jpg' && ext != 'jpeg' && ext != 'png') {
            Swal.fire({ icon: 'warning', html: 'Only jpg/jpeg/png files are allowed!!!' });
        } else {
            document.getElementById('phototip').innerHTML = '';
            frame.src=URL.createObjectURL(event.target.files[0]);
        }
    }
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) { return new bootstrap.Tooltip(tooltipTriggerEl) });
    btnids = document.querySelectorAll('[id*=close]');
    btnids.forEach(ele => {
        i = ele.id;
        document.getElementById(i).addEventListener("click", function(e) {
            e.preventDefault();
            var id = e.srcElement.id;
            var divid = id[0] == 'q' ? 'academic'+id[6] : 'experience'+id[6];
            document.getElementById(divid).remove();
            document.querySelector('[role=tooltip]').remove();
        });
    });
    var qualFlag = 5;
    document.getElementById('addQual').addEventListener("click", function(e) {
        e.preventDefault();
        var id = 'academic'+qualFlag;
        document.getElementById(id).classList.remove('d-none');
        qualFlag++;
        if (qualFlag == 10) {
            document.getElementById('addQual').remove();
        }
    });
    var expFlag = 5;
    document.getElementById('addExp').addEventListener("click", function(e) {
        e.preventDefault();
        var id = 'experience'+expFlag;
        document.getElementById(id).classList.remove('d-none');
        expFlag++;
        if (expFlag == 10) {
            document.getElementById('addExp').remove();
        }
    });
    document.getElementById('createwebprofile').addEventListener("click", function(e) {
        e.preventDefault();
        Swal.fire({ html: 'Are you sure you have filled all necessary data?<br>Click <strong>Yes</strong> to proceed or click <strong>Cancel</strong> to go back.',
            showCancelButton: true,
            confirmButtonText: "Yes",
            icon: 'warning' }).then((result) => { if (result.isConfirmed) { document.getElementById('myform').submit(); } });
    });