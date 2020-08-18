const left_arrow = document.querySelector('.arrow-left');
const right_arrow = document.querySelector('.arrow-right');
let first_name = document.querySelector('.first__name');
let last_name = document.querySelector('.last__name');
let job_title = document.querySelector('.job__title');
let job_location = document.querySelector('.location');
let hire_image = document.querySelector('.full__images');
let mobile_image = document.querySelector('.mobile__image');
let full_name = document.querySelector('.full__name');
let job_title_mobile = document.querySelector('.job__title-mobile');

// play japa sound when logo is clicked
const sound = document.querySelector('.japa__music');
const playSound = document.querySelector('.logo');
playSound.addEventListener('click', () => {
	sound.volume = 0.1;
	sound.play();
});

// add colour to nav bar solid on scroll
const main_bar = document.querySelector('.main-nav');
window.onscroll = function() {
	if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50) {
		main_bar.classList.add('colored');
	} else {
		main_bar.classList.remove('colored');
	}
};

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const nav_bar = document.querySelector('.nav-bar');
const nav_links = document.querySelectorAll('.nav-links');

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	nav_bar.classList.toggle('show');
});

nav_links.forEach((link) => {
	link.addEventListener('click', () => {
		if (hamburger.classList.contains('active')) {
			hamburger.classList.remove('active');
			nav_bar.classList.remove('show');
		}
	});
});

// Get all the slide pictures
let hires = document.querySelectorAll('.hire');
//Using glide.js
const config = {
	rewind: false,
	type: 'slider',
	perView: 5,
	startAt: 0,
	perTouch: 1,
	breakpoints: {
		1100: {
			perView: 4
		},
		900: {
			perView: 3
		},
		800: {
			perView: 2
		}
	}
};
try {
	let glide = new Glide('#options-type', config);
	//get the index of slides on clicking the control arrow
	glide.on([ 'mount.before', 'run' ], function() {
		if (glide.index === 0) {
			left_arrow.classList.add('arrow-hide');
		} else {
			left_arrow.classList.remove('arrow-hide');
		}
		if (glide.index === hires.length - 1) {
			right_arrow.classList.add('arrow-hide');
		} else {
			right_arrow.classList.remove('arrow-hide');
		}
		displayPicture(glide.index, mobile_image);
		getDeatilsMobile(glide.index);
	});
	glide.mount();
} catch (e) {
	console.log(e);
}

//add on click event listener to each of them
for (let i = 0; i < hires.length; i++) {
	hires[i].addEventListener('click', () => {
		getDeatils(i);
		displayPicture(i, hire_image);
		currentProfile(event);
	});
}
function getDeatilsMobile(index) {
	//load recent_hires from the json
	fetch('hires.json')
		.then((res) => {
			return res.json();
		})
		.then((hires) => {
			full_name.textContent = `${hires[index].first_name} ${hires[index].last_name}`;
			job_title_mobile.textContent = hires[index].job_title;
		})
		.catch((err) => {
			console.log(err);
		});
}
function getDeatils(index) {
	//load recent_hires from the json
	fetch('hires.json')
		.then((res) => {
			return res.json();
		})
		.then((hires) => {
			first_name.textContent = hires[index].first_name;
			last_name.textContent = hires[index].last_name;
			job_title.textContent = hires[index].job_title;
			job_location.textContent = hires[index].location;
		})
		.catch((err) => {
			console.log(err);
		});
}

function displayPicture(index, element) {
	// console.log(index);
	element.style.backgroundImage = `url('./images/hires/${index}.jpeg')`;
}

/*when a picture is clicked, remove the active class from all elements. then add active class to the picture that was clicked using event.currentTarget */
function currentProfile(event) {
	for (let i = 0; i < hires.length; i++) {
		hires[i].classList.remove('active');
	}
	event.currentTarget.classList.add('active');
}

// open and close hire talent form
const hire_talents = document.querySelector('.hire__talents');
const form = document.querySelector('.form__group');
const close_form = document.querySelector('.close_form');
const hire_button = document.querySelector('.nav-btn');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	alert('form submitted');
});

close_form.addEventListener('click', () => {
	hire_talents.style.display = 'none';
});

hire_button.addEventListener('click', () => {
	hire_talents.style.display = 'block';
});
// Using intersection oberserver
const sliders = document.querySelectorAll('.slider');
const slide = (target) => {
	const sliderObserver = new IntersectionObserver((entries, sliderObserver) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;
			entry.target.classList.add('appear');
			// console.log(entry.target);
			sliderObserver.unobserve(entry.target);
		});
	});
	sliderObserver.observe(target);
};

sliders.forEach(slide);
