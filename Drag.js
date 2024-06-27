function drag(event) {
    const rect = sliderContainer.getBoundingClientRect();
    let offsetX = event.clientX - rect.left;

    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;

    sliderHandle.style.left = `${offsetX}px`;
    image2.style.clip = `rect(0, ${offsetX}px, 400px, 0)`;

    // Adjust position of the circle
    const handleCircle = document.querySelector('.handle-circle');
    const handleWidth = parseInt(window.getComputedStyle(sliderHandle).width);
    const circleDiameter = 12; // Diameter of the circle

    // Calculate center position of the circle within the handle
    const circleLeft = offsetX + handleWidth / 2 - circleDiameter / 2;
    
    // Apply the calculated position
    handleCircle.style.left = `${circleLeft}px`;
}
