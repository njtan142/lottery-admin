import React, { useEffect, useState } from "react";

const NetworkImage = ({ src, fallbackSrc, alt, className }) => {
    const [imgSrc, setImgSrc] = useState(src);

    const handleError = () => {
        console.log("Error loading image: ", src);
        setImgSrc(fallbackSrc);
    };

    useEffect(() => {
        if(src) {
            setImgSrc(src);
        }else{
            setImgSrc(fallbackSrc);
        }
    }, [src]);

    return <img src={imgSrc} alt={alt} onError={handleError} className={className ?? ""} />;
};

export default NetworkImage;