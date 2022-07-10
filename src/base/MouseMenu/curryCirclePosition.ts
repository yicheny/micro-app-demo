interface Info{
    boxW:number,
    boxH:number,
    itemW?:number,
    itemH?:number
}

interface Position{
    bottom:number,
    left:number
}

type GetPosition = (currentIndex:number)=>Position

export function curryCirclePosition(info:Info,maxCount:number):GetPosition {
    const {boxW=300,boxH=300,itemW=60,itemH=60} = info;

    return (i:number) => {
        const rad = ((i % maxCount) / (maxCount / 2)) * Math.PI;
        const sinValue = Math.sin(rad).toFixed(4);
        const cosValue = Math.cos(rad).toFixed(4);
        const height = (boxH - itemH) / 2;
        const width = (boxW - itemW) / 2;
        const bottom = (Number(cosValue) * height) + height;
        const left = (Number(sinValue) * width) + width;
        return {bottom, left};
    }
}
