import React, { useState } from "react";
import StandardDropdown from "../../standardDropdown/dropdown";
import { Button } from "@mui/material";
import axios from "axios";

const ShirtCostume = () => {

    const [designStyle, setDesignStyle] = useState(designStyle || 'design style');
    const [shirtType, setShirtType] = useState(shirtType || 'shirt type');
    const [sleeveLength, setSleeveLength] = useState(sleeveLength || 'sleeve length');
    const [shirtColor, setShirtColor] = useState(shirtColor || 'color');
    const [shirtPattern, setShirtPattern] = useState(shirtPattern || 'pattern');



    // let detailPrompt = `Rewrite the prompt and add some more lines from you, giving it greater emphasis with more details, to create a profile avatar based on this information:- make sure image style will be ${imageStyle}, gender:${gender}, hair style:${hairstyle},hair color:${hairColor}${gender == "Male" ? `,facial hair:${facialHair}` : ""},facial Expression:${facialExpression},eye color:${eyeColor},skin tone:${skinTone},clothing style:${clothingStyle},accessories:${accessories},body type:${bodyType},age:${age},ethnicity:${ethnicity}, Remember to infuse the avatar with vitality and energy`
    // console.log(detailPrompt);
    //   
    const generateText = async () => {

        try {
            const response = await axios.post(
                'https://api.openai.com/v1/engines/text-davinci-003/completions',
                {
                    prompt: detailPrompt,
                    max_tokens: 700,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.apiKey}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response.data.choices[0].text);
            //   setText(response.data.choices[0].text);
        } catch (error) {
            console.error('Error:', error);
        }
    };



    const designStyleOptionsText = [
        {
            id: 1,
            text: 'Modern',
        },
        {
            id: 2,
            text: 'Futuristic',
        },
    ];

    const shirtTypeOptionsText = [
        {
            id: 1,
            text: 'T-shirt',
        },
        {
            id: 2,
            text: 'Button-up',
        },
        {
            id: 3,
            text: 'Polo shirt',
        },
        {
            id: 4,
            text: 'Henley shirt',
        },
    ];

    const sleeveLengthOptionsText = [
        {
            id: 1,
            text: 'short sleeves',
        },
        {
            id: 2,
            text: 'long sleeves',
        },
    ];
    const shirtColorOptionsText = [
        {
            id: 1,
            text: 'Red',
        },
        {
            id: 2,
            text: 'Blue',
        },
        {
            id: 3,
            text: 'Black',
        },
        {
            id: 4,
            text: 'Grey',
        },
        {
            id: 5,
            text: 'Pink',
        },
    ];
    const patternOptionsText = [
        {
            id: 1,
            text: 'Camouflage',
        },
        {
            id: 2,
            text: 'Animal',
        },
        {
            id: 3,
            text: 'flower',
        },
        {
            id: 4,
            text: 'funky',
        },
        {
            id: 5,
            text: 'Polka dots',
        },
    ];

    return (
        <>

            <StandardDropdown
                dropdownItemText={designStyleOptionsText}
                state={designStyle}
                setState={setDesignStyle}
            />

            <StandardDropdown
                dropdownItemText={shirtTypeOptionsText}
                state={shirtType}
                setState={setShirtType}
            />

            <StandardDropdown
                dropdownItemText={sleeveLengthOptionsText}
                state={sleeveLength}
                setState={setSleeveLength}
            />

            <StandardDropdown
                dropdownItemText={shirtColorOptionsText}
                state={shirtColor}
                setState={setShirtColor}
            />

            <StandardDropdown
                dropdownItemText={patternOptionsText}
                state={shirtPattern}
                setState={setShirtPattern}
            />

            
            <Button onClick={generateText}>Submit</Button>
        </>
    )
}

export default ShirtCostume;