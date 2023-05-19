
const 
	body = document.querySelector('body'),
	html = document.querySelector('html'),
	menu = document.querySelectorAll('.header__burger, .header__nav, body'),
	burger = document.querySelector('.header__burger'),
	header = document.querySelector('.header');


// =-=-=-=-=-=-=-=-=-=-=-=- <slider-animating> -=-=-=-=-=-=-=-=-=-=-=-=

function slideUp (target, duration=300) {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.boxSizing = 'border-box';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout( () => {
	  target.style.display = 'none';
	  target.style.removeProperty('height');
	  target.style.removeProperty('padding-top');
	  target.style.removeProperty('padding-bottom');
	  target.style.removeProperty('margin-top');
	  target.style.removeProperty('margin-bottom');
	  target.style.removeProperty('overflow');
	  target.style.removeProperty('transition-duration');
	  target.style.removeProperty('transition-property');
	}, duration);
}

function slideDown (target, duration=300) {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;

	if (display === 'none')
	  display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.boxSizing = 'border-box';
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout( () => {
	  target.style.removeProperty('height');
	  target.style.removeProperty('overflow');
	  target.style.removeProperty('transition-duration');
	  target.style.removeProperty('transition-property');
	}, duration);
}

// =-=-=-=-=-=-=-=-=-=-=-=- </slider-animating> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <popup> -=-=-=-=-=-=-=-=-=-=-=-=
	
function Popup(arg) {

	let body = document.querySelector('body'),
		html = document.querySelector('html'),
		saveHref = (typeof arg == 'object') ? (arg['saveHref']) ? true : false : false,
		popupCheck = true,
		popupCheckClose = true;

	const removeHash = function () {
		let uri = window.location.toString();
		if (uri.indexOf("#") > 0) {
			let clean_uri = uri.substring(0, uri.indexOf("#"));
			window.history.replaceState({}, document.title, clean_uri);
		}
	}

	const open = function (id, initStart) {

		if (popupCheck) {
			popupCheck = false;

			let popup = document.querySelector(id);

			if (popup) {

				if(popup.classList.contains('popup')) {

					body.classList.remove('_popup-active');
					html.style.setProperty('--popup-padding', window.innerWidth - body.offsetWidth + 'px');
					body.classList.add('_popup-active');

					if (saveHref) history.pushState('', "", id);

					setTimeout(() => {
						if (!initStart) {
							popup.classList.add('_active');
							function openFunc() {
								popupCheck = true;
								popup.removeEventListener('transitionend', openFunc);
							}
							popup.addEventListener('transitionend', openFunc)
						} else {
							popup.classList.add('_transition-none');
							popup.classList.add('_active');
							popupCheck = true;
						}

					}, 0)
				}

			} else {
				return new Error(`Not found "${id}"`)
			}
		}
	}

	const close = function (popupClose) {
		if (popupCheckClose) {
			popupCheckClose = false;

			let popup
			if (typeof popupClose === 'string') {
				popup = document.querySelector(popupClose)
			} else {
				popup = popupClose.closest('.popup');
			}

			if (popup.classList.contains('_transition-none')) popup.classList.remove('_transition-none')

			setTimeout(() => {
				popup.classList.remove('_active');
				function closeFunc() {
					const activePopups = document.querySelectorAll('.popup._active');

					if (activePopups.length < 1) {
						body.classList.remove('_popup-active');
						html.style.setProperty('--popup-padding', '0px');
					}

					if (saveHref) {
						removeHash();
						if (activePopups[activePopups.length - 1]) {
							history.pushState('', "", "#" + activePopups[activePopups.length - 1].getAttribute('id'));
						}
					}

					popupCheckClose = true;
					popup.removeEventListener('transitionend', closeFunc)
				}

				popup.addEventListener('transitionend', closeFunc)

			}, 0)

		}
	}

	return {

		open: function (id) {
			open(id);
		},

		close: function (popupClose) {
			close(popupClose)
		},

		init: function () {

			let thisTarget
			body.addEventListener('click', function (event) {

				thisTarget = event.target;

				let popupOpen = thisTarget.closest('.open-popup');
				if (popupOpen) {
					event.preventDefault();
					open(popupOpen.getAttribute('href'))
				}

				let popupClose = thisTarget.closest('.popup-close');
				if (popupClose) {
					close(popupClose)
				}

			});

			if (saveHref) {
				let url = new URL(window.location);
				if (url.hash) {
					open(url.hash, true);
				}
			}
		},

	}
}

const popup = new Popup();

popup.init()

// =-=-=-=-=-=-=-=-=-=-=-=- </popup> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=- <click events> -=-=-=-=-=-=-=-=-=-=-

let faqItemCheck = false;

body.addEventListener('click', function (event) {

	function $(elem) {
		return event.target.closest(elem)
	}

	// =-=-=-=-=-=-=-=-=-=- <open menu in header> -=-=-=-=-=-=-=-=-=-=-

	if ($('.header__burger')) {
		menu.forEach(element => {
			element.classList.toggle('_mob-menu-active')
		})
	} else if(!$('.header__nav')) {
		menu.forEach(element => {
			element.classList.remove('_mob-menu-active')
		})
	}

	// =-=-=-=-=-=-=-=-=-=- </open menu in header> -=-=-=-=-=-=-=-=-=-=-



	// =-=-=-=-=-=-=-=-=-=-=-=- <header-drop-down> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const headerLink = $(".header__nav--list > li > a");
	if(headerLink) {
	
		if(headerLink.parentElement.querySelector('ul')) {
			
			if(headerLink.classList.contains('active')) {
				
				document.querySelectorAll('.header__nav--list > li > a.active').forEach(activeLink => {
					activeLink.classList.remove('active');
				})

				//headerLink.parentElement.style.setProperty('--height-list', '0px');

			} else {

				document.querySelectorAll('.header__nav--list > li > a.active').forEach(activeLink => {
					
					const activeList = activeLink.parentElement.querySelector('ul');
					//let activeLinks = activeList.querySelectorAll('a.active');

					activeLink.classList.remove('active');
					slideUp(activeList)
					
					/* lists.forEach(list => {
						list.parentElement.querySelector('a.active').classList.remove('active');
						
						slideUp(list.parentElement.querySelector('ul'));
					}) */
				})



				event.preventDefault();
				const list = headerLink.parentElement.querySelector('ul');
				slideDown(list);
				headerLink.classList.add('active');
			}
		}
	
	} else if(!$(".header__nav--list > li")) {
		
		document.querySelectorAll('.header__nav--list > li > a.active').forEach(activeLink => {

			menu.forEach(element => {
				element.classList.remove('_mob-menu-active')
			})
			
			const activeListsLinks = activeLink.parentElement.querySelector('ul').querySelectorAll('a.active'),
			activeList = activeLink.parentElement.querySelector('ul');
			activeLink.classList.remove('active');

			if(activeList) {
				slideUp(activeList);
			}
			
			activeListsLinks.forEach(activeListsLink => {
				activeListsLink.parentElement.querySelector('a.active').classList.remove('active')
				slideUp(activeListsLink.parentElement.querySelector('ul'));
			})
		})
	}

	const headerNavSubLink = $('.header__nav--list > li > ul > li > a');
	if(headerNavSubLink) {
		const list = headerNavSubLink.parentElement.querySelector('ul');
		if(list) {
			if(!headerNavSubLink.classList.contains('active')) {
				document.querySelectorAll('.header__nav--list > li > ul > li > a.active').forEach(activeLink => {
					activeLink.classList.remove('active');
					const list = activeLink.parentElement.querySelector('ul')
					slideUp(list)
				})
				event.preventDefault();
				headerNavSubLink.classList.add('active');
				slideDown(list)
			}
		}
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </header-drop-down> -=-=-=-=-=-=-=-=-=-=-=-=



	// =-=-=-=-=-=-=-=-=-=-=-=- <tariffs-list-more> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const tariffsSlideListMore = $(".tariffs__slide--list-more")
	if(tariffsSlideListMore) {
	
		const card = tariffsSlideListMore.closest('.tariffs__slide'),
			  list = card.querySelector('.tariffs__slide--list'),
			  span = tariffsSlideListMore.querySelector('span');
	
		list.classList.toggle('active');
		if(list.classList.contains('active')) {
			span.textContent = tariffsSlideListMore.dataset.closeText;
			tariffsSlideListMore.setAttribute('aria-label', tariffsSlideListMore.dataset.closeText);
		} else {
			span.textContent = tariffsSlideListMore.dataset.openText;
			tariffsSlideListMore.setAttribute('aria-label', tariffsSlideListMore.dataset.openText);
		}
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </tariffs-list-more> -=-=-=-=-=-=-=-=-=-=-=-=

	

	
	// =-=-=-=-=-=-=-=-=-=- <FAQ> -=-=-=-=-=-=-=-=-=-=-
	
	const faqItemQuestion = $('.faq__item--question');
	if (faqItemQuestion) {

		const faqItem = faqItemQuestion.closest('.faq__item');
	
		if (!faqItemCheck) {
		faqItemCheck = true;
	
		faqItem.classList.add('_animating');
	
		const faqItemAnswear = faqItem.querySelector('.faq__item--answear'),
		activeFaqItem = document.querySelector('.faq__item._active');
	
		if (!faqItem.classList.contains('_active')) {
	
			if (activeFaqItem) {
				activeFaqItem.classList.remove('_active');
				activeFaqItem.querySelector('.faq__item--answear').style.display = 'block';
				slideUp(activeFaqItem.querySelector('.faq__item--answear'));
			}
	
			faqItem.classList.add('_active');
			slideDown(faqItemAnswear);
	
		} else {
	
			faqItemAnswear.style.display = 'block';
			slideUp(faqItemAnswear);
			faqItem.classList.remove('_active');
	
		}
	
		setTimeout(() => {
			faqItemCheck = false;
		},300)
	
		}
	
	}
	
	// =-=-=-=-=-=-=-=-=-=- </FAQ> -=-=-=-=-=-=-=-=-=-=-
	
	

	// =-=-=-=-=-=-=-=-=-=-=-=- <flexible-pricing-nav> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const flexiblePricingTabNavBtn = $(".flexible-pricing__tab-nav--btn")
	if(flexiblePricingTabNavBtn) {

		event.preventDefault();
	
		const parent = flexiblePricingTabNavBtn.parentElement,
		block = document.querySelector(flexiblePricingTabNavBtn.getAttribute('href'));

		if(!flexiblePricingTabNavBtn.classList.contains('_active')) {
			if(parent.querySelector('.flexible-pricing__tab-nav--btn._active')) {
				const activeBtn = parent.querySelector('.flexible-pricing__tab-nav--btn._active'),
					  activeBlock = document.querySelector(activeBtn.getAttribute('href'));

				activeBlock.classList.remove('_active');
				activeBtn.classList.remove('_active');
			}
			
			
			flexiblePricingTabNavBtn.classList.add('_active');
			block.classList.add('_active');
		}
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </flexible-pricing-nav> -=-=-=-=-=-=-=-=-=-=-=-=



	// =-=-=-=-=-=-=-=-=-=-=-=- <table-of-contents-for-blog-page> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const tableOfContentsLink = $(".table-of-contents a")
	if(tableOfContentsLink) {
	
		event.preventDefault();
		
		const block = document.querySelector(tableOfContentsLink.getAttribute('href'));
		
		window.scrollTo({
			left: 0, top: block.getBoundingClientRect().top + window.scrollY - header.offsetHeight,
			behavior: 'smooth',
		})

		history.pushState('', "", '#' + block.getAttribute('id'));
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </table-of-contents-for-blog-page> -=-=-=-=-=-=-=-=-=-=-=-=
	

})

// =-=-=-=-=-=-=-=-=-=- </click events> -=-=-=-=-=-=-=-=-=-=-


// =-=-=-=-=-=-=-=-=-=-=-=- <gradient-svg> -=-=-=-=-=-=-=-=-=-=-=-=

const 
icons = document.querySelectorAll('.gradient-mode');
gradient = document.querySelector('#accent-gradient');

icons.forEach((icon, index) => {
	icon.insertAdjacentElement('beforeend', gradient.cloneNode(true));
	icon.style.fill = `url(#accent-gradient-${index})`;
	const svgGradient = icon.querySelector('linearGradient');
	svgGradient.setAttribute('id', svgGradient.getAttribute('id') + '-' + index);
})

// =-=-=-=-=-=-=-=-=-=-=-=- </gradient-svg> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

const tariffsLists = document.querySelectorAll('.tariffs__slide--list');

let resizeCheck = {}, windowSize, mobStart = (window.innerWidth >= 992) ? true : false;

const appendToOnTablet = document.querySelectorAll("[data-append-to]"),
	  appendToOnTabletArray = [];

appendToOnTablet.forEach(appendToOnTablet => {
	if(mobStart) appendToOnTablet.style.display = "none";
	appendToOnTabletArray.push({
		element: appendToOnTablet,
		parent: appendToOnTablet.parentElement,
		appendAddress: document.querySelector(appendToOnTablet.dataset.appendTo),
	})
})

function resizeCheckFunc(size, minWidth, maxWidth) {
	if (windowSize <= size && (resizeCheck[String(size)] == true || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != false) {
		resizeCheck[String(size)] = false;
		maxWidth(); // < size
	}

	if (windowSize >= size && (resizeCheck[String(size)] == false || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != true) {
		resizeCheck[String(size)] = true;
		minWidth(); // > size
	}
}

let subjectsSlider, chooseCitySlider, 
subjectsSliderElement = document.querySelector('.subjects__slider'),
chooseCitySliderElement = document.querySelector('.choose-city__slider');

let getHeight = [];
if(document.querySelectorAll('.get-height')[0]) {
	document.querySelectorAll('.get-height').forEach(getHeightElement => {
		getHeight.push([getHeightElement, getHeightElement.closest('section')]);
	})
}

function resize() {

	if(header) html.style.setProperty("--height-header", header.offsetHeight + "px");
	if(windowSize != window.innerWidth) {
		html.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
	}

	windowSize = window.innerWidth;

	setTimeout(() => {
		tariffsLists.forEach(tariffsList => {
			tariffsList.style.setProperty('--height', tariffsList.scrollHeight + 'px');
		})
	},0)

	Array.from(getHeight).forEach(getHeight => {
		getHeight[1].style.setProperty('--height-block', getHeight[0].offsetHeight + 'px');
	})
	

	resizeCheckFunc(768,
		function () {  // screen > 992px

			Array.from(appendToOnTabletArray).forEach(appendElement => {
				appendElement["element"].style.display = "none";
				appendElement["appendAddress"].append(appendElement["element"]);
				appendElement["element"].style.removeProperty('display');
			})

			if(subjectsSlider) subjectsSlider.destroy(true, true);
			if(chooseCitySlider) chooseCitySlider.destroy(true, true);

		},
		function () {  // screen < 992px

			if(mobStart) {
				Array.from(appendToOnTabletArray).forEach(appendElement => {
					appendElement["element"].style.display = "none";
					appendElement["parent"].append(appendElement["element"]);
					appendElement["element"].style.removeProperty('display');
				})
			} else {
				mobStart = true;
			}

			if(subjectsSliderElement) {

				subjectsSlider = new Swiper('.subjects__slider', {
					spaceBetween: 20,
					slidesPerView: 1,
					
					grid: {
						rows: 4,
					},
					
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
					},
				})

			}

			if(chooseCitySliderElement) {

				chooseCitySlider = new Swiper('.choose-city__slider', {
		
					spaceBetween: 30,
					slidesPerView: 1,
				
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
					},
				
					breakpoints: {
						550: {
							slidesPerView: 3,
						}
					}
				
				});

			}

		}
	);

}

resize();

window.onresize = resize;

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <scroll> -=-=-=-=-=-=-=-=-=-=-=-=

if(header) {

	let scrollPos;
	function scroll() {
		scrollPos = Math.abs(body.getBoundingClientRect().y);

		if(scrollPos > 50 && !header.classList.contains('_scroll-mode')) {
			header.classList.add('_scroll-mode')
		} else if(scrollPos <= 50 && header.classList.contains('_scroll-mode')) {
			header.classList.remove('_scroll-mode')
		}
	}

	scroll()

	document.addEventListener('scroll', scroll)

	setTimeout(() => {
		header.style.transition = 'box-shadow .3s ease, padding-top .3s linear, padding-bottom .3s linear, opacity .3s ease, visibility .3s ease';
	},0)

	function headerScroll(arg) {

		function getCoords(elem) {
			var box = elem.getBoundingClientRect();
		
			return {
			top: box.top + pageYOffset,
			left: box.left + pageXOffset
			};
		
		}
	
		let hToDown = 300,
			hToUp = 50,
	
			headerPos = getCoords(header),
	
			hPosToDown, hPosToUp, hCheck = [true, true], hPosCheck = false,
			hTopCheck = false, scrolled = [0, 0], checkScrolled = '';
	  
	
		function headerScrollFunc() {

		scrolled[0] = headerPos.top
		headerPos = getCoords(header);
		scrolled[1] = headerPos.top

			if (!hPosCheck) {

				hPosCheck = true;

				hPosToDown = headerPos.top + hToDown;
				hPosToUp = headerPos.top - hToUp;

			}

			if (scrolled[0] > scrolled[1]) {
			  
				checkScrolled = 'up';
			  
			  } else if (scrolled[0] < scrolled[1]) {
				
				checkScrolled = 'down';
				
			  }
			
			
			  if (checkScrolled == 'down') hPosToUp = headerPos.top - hToUp;
			  if (checkScrolled == 'up') hPosToDown = headerPos.top + hToDown;
			
			
			  if (hPosToUp >= headerPos.top && hCheck[0]) {
				hCheck[0] = false; hCheck[1] = true;
			
				header.classList.remove('_hide'); // SHOW HEADER
			  }
			
			  if (hPosToDown <= headerPos.top && hCheck[1]) {
				hCheck[1] = false; hCheck[0] = true;
			
				header.classList.add('_hide'); // HIDE HEADER
			  }

		}

		headerScrollFunc();

		document.addEventListener('scroll', headerScrollFunc)
	
	}
	
	
	headerScroll();

}

// =-=-=-=-=-=-=-=-=-=-=-=- </scroll> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=


window.addEventListener('load', function () {

	Array.from(getHeight).forEach(getHeight => {
		getHeight[1].style.setProperty('--height-block', getHeight[0].offsetHeight + 'px');
	})

	let weWorkSlider = new Swiper('.we-work__slider', {

		spaceBetween: 0,
		slidesPerView: 1,
		autoHeight: true,
	
		loop: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
	
	});

	let tariffsSlider = new Swiper('.tariffs__slider', {

		spaceBetween: 15,
		slidesPerView: 1,
	
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},

		on: {
			init: function () {
				setTimeout(() => {
					tariffsLists.forEach(tariffsList => {
						tariffsList.style.setProperty('--height', tariffsList.scrollHeight + 'px');
					})
				},0)
			},
		},

		breakpoints: {
			768: {
				slidesPerView: 3,
				spaceBetween: 15,
			},
			550: {
				slidesPerView: 2,
				spaceBetween: 15,
			}
		}
	
	});

	tariffsSlider.on("slideChange", function () {
		tariffsLists.forEach(tariffsList => {
			tariffsList.classList.remove('active')
		})
	})

	
	let examplesWorksSlider = new Swiper('.examples-works__slider', {
	
		spaceBetween: 0,
		slidesPerView: 1,
	
		loop: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
	
	});

	if(examplesWorksSlider) {
		Array.from(examplesWorksSlider.slides).forEach((slide, index) => {
			const number = slide.querySelector('.examples-works__slide--number');
			if(number) {
				number.dataset.number = (index+1 <= 9) ? `0${index+1}` : index+1;
				number.textContent = (examplesWorksSlider.slides.length <= 9) ? `0${examplesWorksSlider.slides.length}` : examplesWorksSlider.slides.length;
			}
		})
	}

	
	let guaranteesSlider = new Swiper('.guarantees__slider', {
	
		spaceBetween: 30,
		slidesPerView: 1,
	
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
	
		breakpoints: {
			768: {
				slidesPerView: 3,
			},
		}
	
	});

	
	// =-=-=-=-=-=-=-=-=-=- <image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-

	const imageBody = document.querySelectorAll('.image-body, figure');
	imageBody.forEach(imageBody => {
		const img = imageBody.querySelector('img'), style = getComputedStyle(imageBody);
		if(img) {
			if(img.getAttribute('width') && img.getAttribute('height') && style.position == "relative")
			imageBody.style.paddingTop = Number(img.getAttribute('height')) / Number(img.getAttribute('width')) * 100 + '%';
		}
		
	})

	// =-=-=-=-=-=-=-=-=-=- </image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-

})

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <form-elements> -=-=-=-=-=-=-=-=-=-=-=-=

document.querySelectorAll('.select select').forEach(select => {
	new SlimSelect({
		select: select,
		settings: {
			showSearch: false,
		},
	})
})


const tel = document.querySelectorAll(".tel");
tel.forEach(tel => {
	const iti = window.intlTelInput(tel, {
		utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
		initialCountry: 'ua'
	});
	

	/* tel.addEventListener('blur', function () {
		if(!iti.isValidNumber()) {
			tel.classList.add('error');
		} else {
			tel.classList.remove('error');
		}
	}) */

	tel.addEventListener('focus', function () {
		tel.value = '+' + tel.value.replace(/[^+\d]/g, '').substring(1);
	})

	tel.addEventListener('input', function () {
		tel.value = '+' + tel.value.replace(/[^+\d]/g, '').substring(1);
		if(!iti.isValidNumber()) {
			tel.classList.add('error');
		} else {
			tel.classList.remove('error');
		}
	})
})

window.addEventListener('load', function () {
	const telArrow = document.querySelectorAll('.iti__arrow');
	telArrow.forEach(telArrow => {
		const parent = telArrow.closest('.iti'),
			  input = parent.querySelector('[data-arrow-path]');
		
		if(input) {
			telArrow.insertAdjacentHTML('beforeend', `<svg width="16" height="16" viewBox="0 0 16 16"><use xlink:href="${input.dataset.arrowPath}"></use></svg>`)
		}
		
	})
})


const inputsFor = document.querySelectorAll('.checkbox-for');
inputsFor.forEach(input => {

	const forElement = input.closest('.form-element').querySelector('.input');
	forElement.addEventListener('input', function (event) {
		if(!input.disabled) input.disabled = true;
		if(input.checked) input.checked = false;
		if(!forElement.required) forElement.required = true;
	})

	forElement.addEventListener('blur', function (event) {
		
		if(!forElement.value) input.disabled = false;
	})

	input.addEventListener('change', function () {
		if(input.checked) {
			forElement.required = false;
		} else {
			forElement.required = true;
		}

	})
})


const date = document.querySelectorAll('.date');
date.forEach(date => {
	date.closest('label').classList.add('date-label')
	new Datepicker(date, {
		language: 'uk'
	}); 
})



const form = document.querySelectorAll('.form');
form.forEach(form => {
	form.addEventListener('submit', function (event) {
		const inputs = form.querySelectorAll('[required]');
		let checkInput = false;
		inputs.forEach(input => {
			if(!input.value || input.classList.contains('error')) {
				checkInput = true;
				input.classList.add('error');
			}
		})

		if(checkInput) event.preventDefault()
		
	})
})

// =-=-=-=-=-=-=-=-=-=-=-=- </form-elements> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <draw-decor-dots> -=-=-=-=-=-=-=-=-=-=-=-=

function getRadians(degrees) {
	return (Math.PI / 180) * degrees;
}

function DrawDottedHorizontalLine(arg){
	let dx=arg.x2-arg.x1,
		space=arg.space;
		newX=arg.x1;

	for (let i=0;i<(Math.round(dx / space));i++){

		drawDot(arg.ctx, newX,arg.y,arg.radius,arg.color);
		
		newX+=space;
	}

}

function DrawDottedVerticalLine(arg){
	let dy=arg.y2-arg.y1,
		space=arg.space;
		newY=arg.y1;
		
	for (let i=0;i<(Math.round(dy / space));i++){

		drawDot(arg.ctx, arg.x, newY, arg.radius, arg.color);
		
		newY+=space;
	}
	
}

function drawDot(ctx, x,y,dotRadius,dotColor){
	ctx.beginPath();
	ctx.arc(x,y, dotRadius, 0, 2 * Math.PI, false);
	ctx.fillStyle = dotColor;
	ctx.fill();
}

function draw(arg) {
	let canvas = arg.canvas;
	if (canvas.getContext) {

		let width = canvas.offsetWidth,
			height = canvas.offsetHeight,
			parent = arg.parent,
			parentWidth = parent.offsetWidth,
			numberWidth = parent.querySelector('.process-number').offsetWidth;

		let ctx = canvas.getContext('2d');
		
		ctx.canvas.width  = canvas.offsetWidth;
  		ctx.canvas.height = canvas.offsetHeight;
		

		let dotSpace = 24;

		if(window.innerWidth >= 768) {
			if(width < parentWidth) {

				DrawDottedHorizontalLine({
					ctx: ctx,
					width: width,
					height: height,
					x1: 6, x2: width - 6,
					y: height / 2,
					radius: 4,
					space: dotSpace,
					color: "#FF803D"
				});

			} else {
	
				DrawDottedHorizontalLine({
					ctx: ctx,
					width: width,
					height: height,
					x1: (window.innerWidth > 1300) ? width - parentWidth + numberWidth + 20 : width - parentWidth + 60 + numberWidth, x2: width - 6,
					y: 6,
					radius: 4,
					space: dotSpace,
					color: "#FF803D"
				});
	
				DrawDottedVerticalLine({
					ctx: ctx,
					width: width,
					height: height,
					y1: 6 + 20, y2: height - 6 - 85,
					x: width - 6,
					radius: 4,
					space: dotSpace,
					color: "#FF803D"
				});
	
				DrawDottedHorizontalLine({
					ctx: ctx,
					width: width,
					height: height,
					x1: (window.innerWidth > 1300) ? (numberWidth > 60) ? (numberWidth / 1.5) : numberWidth : numberWidth + 10, x2: width - 6 - 6,
					y: height - 90 - 6,
					radius: 4,
					space: dotSpace,
					color: "#FF803D"
				});
	
				DrawDottedVerticalLine({
					ctx: ctx,
					width: width,
					height: height,
					y1: height - 70 - 6, y2: height - 6 - 15,
					x: (window.innerWidth > 1300) ? numberWidth / 2 : numberWidth - 10,
					radius: 4,
					space: dotSpace,
					color: "#FF803D"
				});

			}

		} else {

			DrawDottedVerticalLine({
				ctx: ctx,
				width: width,
				height: height,
				y1: 12, y2: height - 12,
				x: (width/2) - 3,
				radius: 8,
				space: dotSpace*1.5,
				color: "#FF803D"
			});

		}

	}
}

const processLineCanvas = document.querySelectorAll('.process-line canvas');
processLineCanvas.forEach(processLineCanvas => {
	let width = 0, height = 0;
	function dashedLineDraw() {
		if(processLineCanvas.offsetWidth != width || processLineCanvas.offsetHeight != height) {
			width = processLineCanvas.offsetWidth;
			height = processLineCanvas.offsetHeight;
			draw({
				canvas: processLineCanvas,
				parent: processLineCanvas.closest('li'),
				dashArray: [15,15],
				lineWidth: 10,
			});
		}
	}
	setInterval(dashedLineDraw,100)	
})

// =-=-=-=-=-=-=-=-=-=-=-=- </draw-decor-dots> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <animation> -=-=-=-=-=-=-=-=-=-=-=-=

AOS.init({
	disable: "mobile",
	once: true,
});

// =-=-=-=-=-=-=-=-=-=-=-=- </animation> -=-=-=-=-=-=-=-=-=-=-=-=
