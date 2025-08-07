/*
Name:           Demo Marketing 1
Written by:     Okler Themes - (http://www.okler.net)
Theme Version:  12.1.0
*/

(($ => {
    gsap.registerPlugin(ScrollTrigger);

    /*
	Section Scale
	*/
    gsap.utils.toArray(".gsap-section-scale").forEach((section, index) => {
		const tl1 = gsap.timeline({
			scrollTrigger: {
				trigger: section,
				start: "100% 100%",
				end: "bottom top",
				scrub: true
			},
		});
	
		tl1.fromTo(
			section, {
				scale: 1,
			},
			{
				scale: 0.9,
				duration: 1,
				ease: "power2.out"
			}
		);
	});

    /*
	Image Change
	*/
  gsap.utils.toArray(".gsap-content-container").forEach(container => {
	ScrollTrigger.create({
		trigger: container,
		start: "top top",
		end: "bottom bottom",
		onUpdate: () => getCurrentSection(container)
	});
});


    const contentMarkers = gsap.utils.toArray(".gsap-content-marker");

    // Set up our content behaviors
    contentMarkers.forEach(marker => {
		marker.content = document.querySelector(`#${marker.dataset.markerContent}`);

		marker.content.enter = () => {
			gsap.fromTo(marker.content, {
				autoAlpha: 0
			}, {
				duration: 0.3,
				autoAlpha: 1
			});
		}
	
		marker.content.leave = () => {
			gsap.to(marker.content, {
				duration: 0.1,
				autoAlpha: 0
			});
		}
	
	});

    // Handle the updated position
    let lastContent;

   function getCurrentSection(container) {
	const currScroll = scrollY;
	let newContent;
	const markers = container.querySelectorAll('.gsap-content-marker');

	markers.forEach(marker => {
		const { offsetTop } = marker;
		const content = document.querySelector(`#${marker.dataset.markerContent}`);
		if (currScroll > (offsetTop - 100)) {
			newContent = content;
		}
	});

	if (newContent && (!lastContent || !newContent.isSameNode(lastContent))) {
		if (lastContent) lastContent.leave();
		newContent.enter();
		lastContent = newContent;
	}
}

})).apply( this, [ jQuery ]);
