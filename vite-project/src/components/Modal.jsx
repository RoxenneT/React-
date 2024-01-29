/* eslint-disable react/prop-types */
// import { useState } from 'react';
import '../styles/modal.css'
import TShirt from './TShirt';

export default function Modal({ tshirts, active, setActive }) {
    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => { setActive(false) }}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                {
                    tshirts.map((tshirt) =>
                        <TShirt
                            key={tshirt.id}
                            imageBackgroundColor={tshirt.imageBackgroundColor}
                            imageSrc={tshirt.imageSrc}
                            displayLeft={tshirt.displayLeft}
                            displayTop={tshirt.displayTop}
                            selectedImage={tshirt.selectedImage}
                            displayText={tshirt.displayText}
                            displayTopText={tshirt.displayTopText}
                            displayLeftText={tshirt.displayLeftText}
                            text={tshirt.text}
                        />
                    )
                }
            </div>
        </div>
    )
}
