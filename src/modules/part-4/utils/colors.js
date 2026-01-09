const SRGB_TO_XYZ_MATRIX = [
    0.4124564, 0.3575761, 0.1804375,
    0.2126729, 0.7151522, 0.0721750,
    0.0193339, 0.1191920, 0.9503041
];

function srgbToLinear(channel) {
    const c = channel / 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function multiplyMatrixVector(matrix, v) {
    return [
        matrix[0] * v[0] + matrix[1] * v[1] + matrix[2] * v[2],
        matrix[3] * v[0] + matrix[4] * v[1] + matrix[5] * v[2],
        matrix[6] * v[0] + matrix[7] * v[1] + matrix[8] * v[2]
    ];
}

function xyzToLab(x, y, z) {
    const xn = x / 95.047;
    const yn = y / 100.000;
    const zn = z / 108.883;

    const fx = xn > 0.008856 ? Math.cbrt(xn) : (7.787 * xn) + (16 / 116);
    const fy = yn > 0.008856 ? Math.cbrt(yn) : (7.787 * yn) + (16 / 116);
    const fz = zn > 0.008856 ? Math.cbrt(zn) : (7.787 * zn) + (16 / 116);

    const L = (116 * fy) - 16;
    const a = 500 * (fx - fy);
    const b = 200 * (fy - fz);

    return [L, a, b];
}


export function srgbToLab(r, g, b) {
    const linR = srgbToLinear(r);
    const linG = srgbToLinear(g);
    const linB = srgbToLinear(b);

    const [x, y, z] = multiplyMatrixVector(SRGB_TO_XYZ_MATRIX, [linR, linG, linB]);

    return xyzToLab(x * 100, y * 100, z * 100);
}

export function generateSRGBLabPoints() {
    const points = [];
    const max = 255;

    for (let r = 0; r <= max; r += 5) {
        for (let g = 0; g <= max; g += 5) {
            for (let b = 0; b <= max; b += 5) {
                const lab = srgbToLab(r, g, b);
                points.push({ lab, rgb: [r, g, b] });
            }
        }
    }

    return points;
}