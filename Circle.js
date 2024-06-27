.slider-handle {
    position: relative;
    top: 0;
    left: 300px; /* Adjust as needed */
    width: 10px;
    height: 100%;
    background: rgba(255, 255, 255, 0.7);
    cursor: ew-resize;
    z-index: 3;
    border: 2px solid #333;
    transition: left 0.3s;
}

/* Blue circle */
.handle-circle {
    position: absolute;
    top: 50%; /* Position in the middle vertically */
    left: 50%; /* Position in the middle horizontally */
    transform: translate(-50%, -50%);
    width: 12px; /* Diameter of the circle */
    height: 12px; /* Diameter of the circle */
    border-radius: 50%;
    background-color: #007bff; /* Blue color */
    z-index: 4; /* Ensure it's above the slider handle */
}
