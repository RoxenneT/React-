/* eslint-disable react/prop-types */
export default function TShirt(
    {
        imageBackgroundColor, 
        imageSrc, 
        displayLeft, 
        displayTop, 
        selectedImage, 
        displayText,
        displayTopText,
        displayLeftText,
        text
    }) {
  return (
    <div className='stuff'>
        <img
            style={{
                backgroundColor: imageBackgroundColor,
                zIndex: '1'
            }}
            src={imageSrc}
            alt="Продукт"
        />
        <img
            style={{
                width: '200px',
                maxHeight: '250px',
                zIndex: '2',
                position: 'absolute',
                color: 'white',
                left: displayLeft,
                bottom: displayTop
            }}
            src={selectedImage}
            alt="Ваше изображение"
        />
        <div>
            {displayText && (
                <div
                    style={{
                        position: 'absolute',
                        top: displayTopText || '36%',
                        left: displayLeftText || '65%',
                        zIndex: '2',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        fontSize: '24px',
                    }}
                >
                    {text}
                </div>
            )}
        </div>
    </div>
  )
}
