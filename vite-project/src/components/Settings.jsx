import { useState } from 'react';
import '../styles/settings.css';
import { useColorContext } from './ColorContext';

function Settings() {
    const [sizes] = useState(['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL']);
    const colors = ['cornflowerblue', 'brown', 'black', 'red', 'orange', 'blue', 'grey', 'purple', 'pink'];
    const { selectedColors, handleColorChange } = useColorContext();
    const [selectAllColors, setSelectAllColors] = useState(false);
    const [colorStates, setColorStates] = useState(selectedColors.map(() => false));
    const [selectAllSizes, setSelectAllSizes] = useState(false);
    const [selectedSizes, setSelectedSizes] = useState([]);
    // const [isTshirt, setIsTshirt] = useState(true);

    // const toggleProductType = () => {
    //     setIsTshirt(!isTshirt);
    // };

    const toggleText = (index) => {
        const newColorStates = [...colorStates];
        newColorStates[index] = !newColorStates[index];
        setColorStates(newColorStates);

        const selectedColors = colors.filter((color, i) => newColorStates[i]);
        handleColorChange(selectedColors);
    };

    const handleSelectAllColors = () => {
        setSelectAllColors(!selectAllColors);
    };

    const handleSelectAllSizes = (event) => {
        const isChecked = event.target.checked;
        setSelectAllSizes(isChecked);

        if (isChecked) {
            setSelectedSizes([...sizes]);
        } else {
            setSelectedSizes([]);
        }
    };

    const handleSizeChange = (size) => {
        const newSelectedSizes = [...selectedSizes];
        const index = newSelectedSizes.indexOf(size);

        if (index !== -1) {
            newSelectedSizes.splice(index, 1);
        } else {
            newSelectedSizes.push(size);
        }

        setSelectedSizes(newSelectedSizes);
    };

    return (
        <div className='container'>
            <div className='header'>
                <h1>Создайте свой продукт</h1>
            </div>

            <div className='product'>
                <div className='text'>
                    <h3>Вид продукта</h3>
                    <span>Футболка</span> <br />
                    <span>Толстовка</span>
                </div>

                {/* <button>Изменить</button> */}
            </div>

            <div className='productColor'>
                <div className='chooseProductStyle'>
                    <h3>Выбор цвета</h3>
                    <span>
                        <input
                            type="checkbox"
                            checked={selectAllColors}
                            onChange={handleSelectAllColors}
                        />{' '}
                        Выбрать все
                    </span>
                </div>
                <div className='options'>
                    <span>Выбрать несколько цветов для заказа</span>
                    <div className='list'>
                        {colors.map((color, index) => (
                            <span
                                key={index}
                                style={{
                                    backgroundColor: color,
                                    width: '1.3em',
                                    height: '1.3em',
                                    border: '.5px solid grey',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    position: 'relative',
                                }}
                                onClick={() => toggleText(index)}
                            >
                                {selectAllColors || colorStates[index] ? (
                                    <p style={{ color: 'white' }}>✔</p>
                                ) : null}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="productSizing">
                <div className='chooseProductStyle'>
                    <h3>Размер</h3>
                    <span>
                        <input
                            type="checkbox"
                            checked={selectAllSizes}
                            onChange={handleSelectAllSizes}
                        />{' '}
                        Выбрать все
                    </span>
                </div>
                <div className='options'>
                    <span>Выбрать несколько размеров для заказа</span>
                    <div className='list'>
                        {
                            sizes.map((size, index) =>
                                <span size={size} key={index}>
                                    <input
                                        type="checkbox"
                                        checked={selectAllSizes || selectedSizes.includes(size)}
                                        onChange={() => handleSizeChange(size)}
                                    />
                                    {size}
                                </span>
                            )
                        }
                    </div>
                </div>
            </div>

            <div className='productDetails'>
                <h3>Детали заказа</h3>
                <span>Придумайте название для вашего творения</span>
                <input type="text" />
            </div>

            <div className='price'>
                <h3>Стоимость заказа:</h3>
                <span>Футболка - 3000тг</span>
                <span>Толстовка - 5000тг</span>
            </div>

        </div>


    )
}

export default Settings;

