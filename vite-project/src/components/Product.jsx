import { useState, useEffect } from 'react';
import '../styles/product.css';
import { useColorContext } from './ColorContext';
import Modal from './Modal';
import TShirt from './TShirt';

function Product() {
    const [modelWindow, setModalWindow] = useState(false)
    const { selectedColors, setSelectedColors } = useColorContext();
    const [imageBackgroundColor, setImageBackgroundColor] = useState('');
    const [imageIndex, setImageIndex] = useState(0);
    const [imageSrc, setImageSrc] = useState([
        'https://catalog-fm.vsemayki.ru/539493875de25ec12b9c48.21518782',
        'https://catalog-fm.vsemayki.ru/1679809989606597f00627c8.77368921'
    ]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [text, setText] = useState('');
    const [displayText, setDisplayText] = useState(false);
    const [displayInput, setDisplayInput] = useState(false);
    const [displayTop, setDisplayTop] = useState(false);
    const [displayLeft, setDisplayLeft] = useState(false);
    const [displayTopText, setDisplayTopText] = useState(false);
    const [displayLeftText, setDisplayLeftText] = useState(false);
    const [styles, setStyles] = useState([])

    const savaStyle = () => {
        setStyles([
            ...styles, 
            {
                id: styles.length + 1,
                selectedColors,
                imageBackgroundColor,
                imageIndex,
                imageSrc: imageSrc[imageIndex],
                selectedImage,
                text,
                displayText,
                displayInput,
                displayTop,
                displayLeft,
                displayTopText,
                displayLeftText
            }]
        )
    }

    useEffect(() => {
        if (selectedColors.length > 0) {
            setImageBackgroundColor(selectedColors[0]);
        } else {
            setImageBackgroundColor('');
        }
    }, [selectedColors]);

    const handleUpdateImage = () => {
        if (imageIndex === 0) {
            setImageIndex((prevIndex) => prevIndex + 1)
        }
        else {
            setImageIndex((prevIndex) => prevIndex - 1)
        }
    };

    const changeTshirt = () => {
        if (imageSrc[0] === 'https://catalog-fm.vsemayki.ru/539493875de25ec12b9c48.21518782') {
            setImageSrc([
                'https://catalog-fm.vsemayki.ru/7626896855de25ece4da586.53478135',
                'https://catalog-fm.vsemayki.ru/1129582243606597fc011a24.87692895'
            ]);
        } else {
            setImageSrc([
                'https://catalog-fm.vsemayki.ru/539493875de25ec12b9c48.21518782',
                'https://catalog-fm.vsemayki.ru/1679809989606597f00627c8.77368921'
            ]);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const imageDataUrl = event.target.result;
                setSelectedImage(imageDataUrl);
                localStorage.setItem('uploadedImage', imageDataUrl);
            };

            reader.readAsDataURL(file);
        }
    };

    const addText = () => {
        setDisplayText(true);
        setDisplayInput(!displayInput);
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const setDisplay = (e) => {
        setDisplayTop(e.target.value + 'px');
    };

    const setLeftDisplay = (e) => {
        setDisplayLeft(e.target.value + 'px');
    };

    const setTopDisplayText = (e) => {
        setDisplayTopText(e.target.value + 'px');
    };

    const setLeftDisplayText = (e) => {
        setDisplayLeftText(e.target.value + 'px');
    };

    // const savedStyle = (id) => {
    //     const lastSavedStyle = styles.find(style => {return style.id === id})
    //     setSelectedColors(lastSavedStyle.selectedColors);
    //     setImageBackgroundColor(lastSavedStyle.imageBackgroundColor);
    //     setImageIndex(lastSavedStyle.imageIndex);
    //     setImageSrc(lastSavedStyle.imageSrc);
    //     setSelectedImage(lastSavedStyle.selectedImage);
    //     setText(lastSavedStyle.text);
    //     setDisplayText(lastSavedStyle.displayText);
    //     setDisplayInput(lastSavedStyle.displayInput);
    //     setDisplayTop(lastSavedStyle.displayTop);
    //     setDisplayLeft(lastSavedStyle.displayLeft);
    //     setDisplayTopText(lastSavedStyle.displayTopText);
    //     setDisplayLeftText(lastSavedStyle.displayLeftText);
    //     console.log(lastSavedStyle);
    // }

    return (
        <div className='containerForProduct'>
            <div className="design">
                <button>
                    <input
                        style={{
                            width: '80px',
                            height: '80px',
                            zIndex: '1',
                            opacity: '0',
                            position: 'absolute'
                        }}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <img src="https://static.thenounproject.com/png/3752804-200.png" alt="picture" />
                    Добавьте изображение
                </button>
                <button onClick={addText}>
                    <img src="https://cdn-icons-png.flaticon.com/512/5304/5304238.png" alt="text" />
                    Добавьте текст
                </button>
                <div className='rotate'>
                    <div>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Eo_circle_grey_arrow-rotate.svg/2048px-Eo_circle_grey_arrow-rotate.svg.png"
                            alt="left"
                            onClick={changeTshirt}
                        />
                        <span>Повернуть</span>
                        <button className='button' onClick={handleUpdateImage}>Изменить продукт</button>
                    </div>

                    {displayInput && (
                        <input
                            type="text"
                            value={text}
                            onChange={handleTextChange}
                            placeholder="Введите текст"
                            maxLength={18}
                            style={{
                                width: '100px',
                                height: '30px',
                                outline: 'none',
                                fontSize: '15px',
                                border: ' 2px solid #bedaebc9',
                                backgroundColor: '#ebf6fdc9',
                                borderRadius: '5px',
                            }}
                        />
                    )}
                </div>
            </div>
            <div className="layout">
                <TShirt
                    imageBackgroundColor={imageBackgroundColor}
                    imageSrc={imageSrc[imageIndex]}
                    displayLeft={displayLeft}
                    displayTop={displayTop || '400px'}
                    selectedImage={selectedImage}
                    displayText={displayText}
                    displayTopText={displayTopText}
                    displayLeftText={displayLeftText}
                    text={text}
                />
                <div style={{ width: "300px", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <span>Настройка изображения</span>
                        <input
                            type="number"
                            min={300}
                            max={477}
                            onChange={setDisplay}
                            placeholder="По вертикали"
                            style={{
                                width: '160px',
                                height: '30px',
                                outline: 'none',
                                fontSize: '15px',
                                border: ' 2px solid #bedaebc9',
                                backgroundColor: '#ebf6fdc9',
                                borderRadius: '5px',
                            }}
                        />
                        <input
                            type="number"
                            onChange={setLeftDisplay}
                            placeholder="По горизонтали"
                            min={1100}
                            max={1187}
                            style={{
                                width: '160px',
                                height: '30px',
                                outline: 'none',
                                fontSize: '15px',
                                border: ' 2px solid #bedaebc9',
                                backgroundColor: '#ebf6fdc9',
                                borderRadius: '5px',
                            }}
                        />
                        <span>Настройка текста</span>
                        <input
                            type="number"
                            min={300}
                            max={477}
                            onChange={setTopDisplayText}
                            placeholder="По вертикали"
                            style={{
                                width: '160px',
                                height: '30px',
                                outline: 'none',
                                fontSize: '15px',
                                border: ' 2px solid #bedaebc9',
                                backgroundColor: '#ebf6fdc9',
                                borderRadius: '5px',
                            }}
                        />
                        <input
                            type="number"
                            onChange={setLeftDisplayText}
                            placeholder="По горизонтали"
                            min={1183}
                            max={1300}
                            style={{
                                width: '160px',
                                height: '30px',
                                outline: 'none',
                                fontSize: '15px',
                                border: ' 2px solid #bedaebc9',
                                backgroundColor: '#ebf6fdc9',
                                borderRadius: '5px',
                            }}
                        />
                    </div>
                    <div>
                        <button
                            style={{
                                height: '30px',
                                width: '80px',
                                color: '#74c0ff',
                                border: '1px solid #74c0ffec',
                                backgroundColor: 'white',
                                fontWeight: 'bold',
                                fontSize: '15px',
                                borderRadius: '5px',
                                marginLeft: '80px'
                            }}
                        onClick={savaStyle} 
                        >
                            Сохранить
                        </button>
                        <button
                            style={{
                                height: '30px',
                                width: '80px',
                                color: '#74c0ff',
                                border: '1px solid #74c0ffec',
                                backgroundColor: 'white',
                                fontWeight: 'bold',
                                fontSize: '15px',
                                borderRadius: '5px',
                                marginLeft: '80px'
                            }}
                            onClick={() => {setModalWindow(true)}}
                        >
                            Вернуть
                        </button>
                        <Modal 
                            active={modelWindow} 
                            setActive={setModalWindow} 
                            tshirts={styles}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Product;

// https://catalog-fm.vsemayki.ru/539493875de25ec12b9c48.21518782 перед футболки
// https://catalog-fm.vsemayki.ru/7626896855de25ece4da586.53478135 зад футболки
// https://catalog-fm.vsemayki.ru/1679809989606597f00627c8.77368921 перед толстовки
// https://catalog-fm.vsemayki.ru/1129582243606597fc011a24.87692895 зад толстовки