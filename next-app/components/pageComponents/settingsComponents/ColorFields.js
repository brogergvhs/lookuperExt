export default function ColorFields ({colorsArray}) {
    return (<>
        <div className="flex">
            <input type="text" id="--main-accent" value="{{data.main_accent}}" data-colorType="--main-accent" className="coloris form-control w-fit" />
            <div className="flex items-center justify-between w-100 ms-4">
                {colorsArray && colorsArray.map((color) => (
                    <div key={color} data-colorType="--main-accent" className="w-6 h-6 rounded-full border border-solid border-secText cursor-pointer"></div>
                ))}
            </div>
        </div>
    </>)
}