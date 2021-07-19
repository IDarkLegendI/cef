function contrastingColor(rgb) 
{
    // //console.log(`luma: ${luma(rgb)};`) 
    return (luma(rgb) >= 165) ? '000' : 'fff';
}
function luma(rgb) // color can be a hx string or an array of RGB values 0-255
{
    return (0.2126 * rgb[0]) + (0.7152 * rgb[1]) + (0.0722 * rgb[2]); // SMPTE C, Rec. 709 weightings
}
