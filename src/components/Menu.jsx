// // import React, { useState, useRef } from "react";
// // import { FaBars } from "react-icons/fa";
// // import { Link } from "react-router-dom";

// // const Menu = () => {
// //     const [isMenuVisible, setIsMenuVisible] = useState(false);
// //     const [isDragging, setIsDragging] = useState(false);
// //     const [position, setPosition] = useState({ x: 50, y: 50 }); // Initial position of the button
// //     const buttonRef = useRef(null); // Reference to the draggable button

// //     // Handle mouse or touch down event to start dragging
// //     const handleStart = (e) => {
// //         setIsDragging(true);
// //         e.preventDefault(); // Prevent any default action
// //     };

// //     // Handle mouse or touch move event to update button position
// //     const handleMove = (e) => {
// //         if (isDragging) {
// //             const clientX = e.touches ? e.touches[0].clientX : e.clientX;
// //             const clientY = e.touches ? e.touches[0].clientY : e.clientY;

// //             const rect = buttonRef.current.getBoundingClientRect();
// //             const newX = Math.max(0, Math.min(clientX - rect.width / 2, window.innerWidth - rect.width));
// //             const newY = Math.max(0, Math.min(clientY - rect.height / 2, window.innerHeight - rect.height));

// //             setPosition({ x: newX, y: newY });
// //         }
// //     };

// //     // Handle mouse or touch up event to stop dragging and snap to nearest boundary
// //     const handleEnd = () => {
// //         setIsDragging(false);

// //         const { x, y } = position;
// //         const screenWidth = window.innerWidth;
// //         const screenHeight = window.innerHeight;

// //         const snapToLeft = x < screenWidth / 2;
// //         const snapToRight = x >= screenWidth / 2;
// //         const snapToBottom = y >= screenHeight / 2;

// //         const snappedPosition = snapToLeft
// //             ? { x: 0, y: snapToBottom ? screenHeight - 100 : screenHeight / 2 - 50 }
// //             : snapToRight
// //                 ? { x: screenWidth - 50, y: snapToBottom ? screenHeight - 100 : screenHeight / 2 - 50 }
// //                 : { x: screenWidth / 2 - 50, y: screenHeight - 100 };

// //         setPosition(snappedPosition);
// //     };

// //     // Toggle menu visibility
// //     const handleButtonClick = (e) => {
// //         setIsMenuVisible((prev) => !prev);
// //         e.stopPropagation(); // Prevent event propagation to dragging events
// //     };

// //     return (
// //         <div
// //             onMouseMove={handleMove}
// //             onTouchMove={handleMove}
// //             onMouseUp={handleEnd}
// //             onTouchEnd={handleEnd}
// //         >
// //             {/* Draggable Button */}
// //             <div
// //                 ref={buttonRef}
// //                 className="fixed bg-blue-500 p-4 rounded-full text-white cursor-pointer z-50"
// //                 style={{ left: `${position.x}px`, top: `${position.y}px` }}
// //                 onMouseDown={handleStart}
// //                 onTouchStart={handleStart}
// //             >
// //                 <FaBars size={24} onClick={handleButtonClick} />
// //             </div>

// //             {/* Vertical Menu - Toggle on Button Click */}
// //             {isMenuVisible && (
// //                 <div
// //                     className="fixed bg-white shadow-lg p-4 rounded-lg z-50"
// //                     style={{
// //                         left: `${Math.min(
// //                             Math.max(position.x + 60, 10),
// //                             window.innerWidth - 200
// //                         )}px`, // Keep menu within screen horizontally
// //                         top: `${Math.min(
// //                             Math.max(position.y, 10),
// //                             window.innerHeight - 200
// //                         )}px`, // Keep menu within screen vertically
// //                     }}
// //                 >
// //                     <Link to="/about" className="block text-gray-800 hover:text-blue-500 mb-2">About</Link>
// //                     <Link to="/projects" className="block text-gray-800 hover:text-blue-500 mb-2">Projects</Link>
// //                     <Link to="/blogs" className="block text-gray-800 hover:text-blue-500 mb-2">Blogs</Link>
// //                     <Link to="/contact" className="block text-gray-800 hover:text-blue-500 mb-2">Contact</Link>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default Menu;

// components/Menu.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Draggable from "react-draggable";
import MenuBtn from "../assets/Logo1.png";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({
    x: window.innerWidth - 100,
    y: window.innerHeight / 2 - 100,
  });
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getSnapPoints = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const offset = 20;

    return {
      middleLeft: { x: offset, y: height / 2 - 100 },
      middleRight: { x: width - 100, y: height / 2 - 100 },
      bottomCenter: { x: width / 2 - 50, y: height - 200 },
    };
  };

  const findNearestSnapPoint = (dragX, dragY) => {
    const snapPoints = getSnapPoints();
    let nearestPoint = null;
    let shortestDistance = Infinity;

    Object.values(snapPoints).forEach((point) => {
      const distance = Math.sqrt(
        Math.pow(dragX - point.x, 2) + Math.pow(dragY - point.y, 2)
      );
      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearestPoint = point;
      }
    });

    return nearestPoint;
  };

  const handleDragStop = (e, data) => {
    console.log(e);
    console.log("drag stopped---");
    const nearestPoint = findNearestSnapPoint(data.x, data.y);
    setPosition(nearestPoint);
  };

  return (
    <Draggable position={position} onStop={handleDragStop} bounds="parent">
      <div className="menu-wrapper">
        <nav className={`menu-nav ${isOpen ? "open" : ""}`}>
          <div
            className={`nav-content ${
              position.x === 20
                ? "middleLeft"
                : position.x === window.innerWidth - 100
                ? "middleRight"
                : "bottomCenter"
            }`}
          >
            <div
              className="toggle-btn"
              onClick={toggleMenu}
              onTouchStart={toggleMenu}
              onMouseDown={handleDragStop}
            >
              <img src={MenuBtn} alt="menu" className="menu-Btn-Img menu-Btn-Img w-auto h-auto border-none m-0 p-0" />
            </div>
            {[
              { to: "/", text: "Home" },
              { to: "/contact", text: "Contact" },
              { to: "/blogs", text: "Blogs" },
              { to: "/projects", text: "Projects" },
              { to: "/about", text: "About" },
            ].map((item, index) => (
              <span key={index} style={{ "--i": index + 1 }}>
                <Link to={item.to} onTouchStart={() => navigate(item.to)}>
                  <p>{item.text}</p>
                </Link>
              </span>
            ))}
          </div>
        </nav>
      </div>
    </Draggable>
  );
};

export default Menu;
