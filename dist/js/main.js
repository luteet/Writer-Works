
const 
	body = document.querySelector('body'),
	html = document.querySelector('html'),
	menu = document.querySelectorAll('.header__burger, .header__nav, body'),
	burger = document.querySelector('.header__burger'),
	header = document.querySelector('.header');

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
	
	
	

})

// =-=-=-=-=-=-=-=-=-=- </click events> -=-=-=-=-=-=-=-=-=-=-


body.addEventListener('mousedown', function (event) {
	
	function $(elem) {
		return event.target.closest(elem)
	}

	
	/* const element = $('a, button, label');
	if(element) {
		
		if(element.querySelector('svg.gradient-mode')) {
			body.classList.add('gradient-active');
		}
		
	} */
})
/* 
window.addEventListener('mouseup', function (event) {
	console.log(event)
	body.classList.remove('gradient-hover');
})

window.addEventListener('blur', function () {
	console.log('blur')
}) */

const 
icons = document.querySelectorAll('.gradient-mode');
gradient = document.querySelector('#accent-gradient');

icons.forEach((icon, index) => {
	icon.insertAdjacentElement('beforeend', gradient.cloneNode(true));
	icon.style.fill = `url(#accent-gradient-${index})`;
	const svgGradient = icon.querySelector('linearGradient');
	svgGradient.setAttribute('id', svgGradient.getAttribute('id') + '-' + index);
})

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

let subjectsSlider, chooseCitySlider;

function resize() {

	html.style.setProperty("--height-header", header.offsetHeight + "px");
	if(windowSize != window.innerWidth) {
		html.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
	}

	windowSize = window.innerWidth;

	setTimeout(() => {
		tariffsLists.forEach(tariffsList => {
			tariffsList.style.setProperty('--height', tariffsList.scrollHeight + 'px');
		})
	},0)
	

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

			subjectsSlider = new Swiper('.subjects__slider', {
				spaceBetween: 20,
				slidesPerView: 1,
				
				grid: {
					rows: 4,
				},
				//autoHeight: true,
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
			})

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
	);

}

resize();

window.onresize = resize;

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <scroll> -=-=-=-=-=-=-=-=-=-=-=-=

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

//window.scroll = scroll;
document.addEventListener('scroll', scroll)

setTimeout(() => {
	header.style.transition = 'box-shadow .3s ease, padding-top .3s linear, padding-bottom .3s linear';
},0)

// =-=-=-=-=-=-=-=-=-=-=-=- </scroll> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=


window.addEventListener('load', function () {
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
		//autoHeight: true,
	
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

	
	

	/* const subjectsSlider = new Swiper('.subjects__slider', {
		spaceBetween: 0,
		slidesPerView: 1,
		grid: {
			rows: 3,
		},
	
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
	}) */
})

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=





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
	

	tel.addEventListener('blur', function () {
		if(!iti.isValidNumber()) {
			tel.classList.add('error');
		} else {
			tel.classList.remove('error');
		}
	})

	tel.addEventListener('focus', function () {
		tel.value = '+' + tel.value.replace(/[^+\d]/g, '').substring(1);
	})

	tel.addEventListener('input', function () {
		tel.value = '+' + tel.value.replace(/[^+\d]/g, '').substring(1);
		if(iti.isValidNumber()) {
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



const inputsFor = document.querySelectorAll('[data-for]');
inputsFor.forEach(input => {

	const forElement = document.querySelector(input.dataset.for);
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

	/* drawDot(ctx, x1,y1,3,dotColor);
	drawDot(ctx, x2,y2,3,dotColor); */
}

function DrawDottedVerticalLine(arg){
	let dy=arg.y2-arg.y1,
		space=arg.space;
		newY=arg.y1;
		
	for (let i=0;i<(Math.round(dy / space));i++){

		drawDot(arg.ctx, arg.x, newY, arg.radius, arg.color);
		
		newY+=space;
	}

	/* drawDot(ctx, x1,y1,3,dotColor);
	drawDot(ctx, x2,y2,3,dotColor); */
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
		//ctx.strokeStyle = "#FF803D";

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

		/* let ratio = Math.min(
			canvas.clientWidth / width,
			canvas.clientHeight / height
		  );
		  ctx.scale(ratio, ratio); //adjust this! */
		//console.log((width / 12) - 10)
		

		
		//ctx.lineWidth = lineWidth;
		
		/* ctx.setLineDash(dashArray);
		ctx.beginPath();

		ctx.moveTo(50, 50); */
		/* ctx.lineTo(0, height/2);
		ctx.lineTo(width, height/2); */

		
		//ctx.arc(angleSize + outerCircleSize, height - angleSize - outerCircleSize - (lineWidth/2), angleSize, getRadians(-180), Math.PI / 2, true);

		/* if(arg.reverse == true) {
			ctx.moveTo(outerCircleSize, outerCircleSize * 3);
			if(arg.disableAngle == true) {
				
				ctx.lineTo(width - outerCircleSize*3, height - (lineWidth/2) - outerCircleSize);
			} else {
				ctx.lineTo(outerCircleSize, height - (angleSize * 2) - lastLine);
				ctx.arc(angleSize + outerCircleSize, height - (angleSize * 2) - lastLine, angleSize, getRadians(-180), Math.PI / 2, true);
				ctx.lineTo(width - (angleSize * 2), height - angleSize - lastLine);
				ctx.arc(width - angleSize - lineWidth - (outerCircleSize), height - lastLine, angleSize, getRadians(-90), getRadians(0), false);
				ctx.lineTo(width - lineWidth - outerCircleSize, height - (outerCircleSize*2.5));
			}
		} else {

			ctx.moveTo(width - lineWidth - outerCircleSize, outerCircleSize * 3);
			if(arg.disableAngle == true) {
				ctx.lineTo(width - lineWidth - outerCircleSize, height - angleSize - outerCircleSize);
				ctx.arc(width - angleSize - outerCircleSize - lineWidth, height - angleSize - (lineWidth/2) - outerCircleSize, angleSize, getRadians(0), Math.PI / 2, false);
				ctx.lineTo((outerCircleSize*2.5) + lineWidth, height - (lineWidth/2) - outerCircleSize);
			} else {
				ctx.lineTo(width - lineWidth - outerCircleSize, height - (angleSize * 2) - lastLine);
				ctx.arc(width - angleSize - outerCircleSize - lineWidth, height - (angleSize * 2) - lastLine, angleSize, getRadians(0), Math.PI / 2, false);
				ctx.lineTo(angleSize * 2, height - angleSize - lastLine);
				ctx.arc(angleSize + outerCircleSize, height - lastLine, angleSize, getRadians(-90), getRadians(180), true);
				ctx.lineTo(outerCircleSize+lineWidth, height+lastLine);
			}
			
		} */

		//ctx.stroke();

		/* ctx.beginPath();
		ctx.setLineDash([]);
		ctx.fillStyle = '#1E1E1E';
		ctx.lineWidth = 0;
		ctx.strokeStyle = "transparent";

		if(arg.reverse == true) {
			ctx.arc(outerCircleSize, outerCircleSize, outerCircleSize, 0, Math.PI * 2, true);
			ctx.arc(width - outerCircleSize*1.2, height - outerCircleSize-1, outerCircleSize, 0, Math.PI * 2, true);
			
		} else {
			ctx.arc(outerCircleSize, height - outerCircleSize-1, outerCircleSize, 0, Math.PI * 2, true);
			ctx.arc(width - outerCircleSize*1.2, outerCircleSize, outerCircleSize, 0, Math.PI * 2, true);
		}
		
		ctx.fill();
		ctx.stroke(); */
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
				//angleSize: (window.innerWidth >= 768) ? 100 : 50,
				dashArray: [15,15],
				lineWidth: 10,
				//disableAngle: true,
			});
		}
	}
	setInterval(dashedLineDraw,100)	
})




/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <lazyload> -=-=-=-=-=-=-=-=-=-=-=-=

new LazyLoad();

// =-=-=-=-=-=-=-=-=-=-=-=- </lazyload> -=-=-=-=-=-=-=-=-=-=-=-=
 */

/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <animation> -=-=-=-=-=-=-=-=-=-=-=-=

AOS.init({
	disable: "mobile",
});

// =-=-=-=-=-=-=-=-=-=-=-=- </animation> -=-=-=-=-=-=-=-=-=-=-=-=

*/
