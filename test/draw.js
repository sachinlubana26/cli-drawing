const assert = require('assert');
const draw = require('../draw');

describe('Canvas Drawing', () => {

    describe('/draw canvas', () => {
        it('it should build canvas with 4 columns and 6 rows', (done) => {
            draw.drawCanvas(20, 4);
            // creates canvas data with 2 padding rows and 2 padded columns for borders
            assert.equal(draw.canvasData.length, 6)
            assert.equal(draw.canvasData[0].length, 22)
            done();
        });
    });

    describe('/draw invalid horizontal line', () => {
        it('it should return false for invalid horizontal line cordinates', (done) => {
            const resp = draw.validateLineCordinates(1, 2, 6, 3)
            assert.equal(resp.success, false);
            assert.equal(resp.msg, 'invalid line cordinates');
            
            done();
        });
    });

    describe('/draw invalid vertical line', () => {
        it('it should return false for invalid vertical line cordinates', (done) => {
            const resp = draw.validateLineCordinates(6, 1, 5, 4)
            assert.equal(resp.success, false);
            assert.equal(resp.msg, 'invalid line cordinates');
            done();
        });
    });

    describe('/draw line with zero cordinate', () => {
        it('it should return false for invalid cordinates', (done) => {
            const resp = draw.validateLineCordinates(0, 2, 6, 3)
            assert.equal(resp.success, false);
            assert.equal(resp.msg, 'cordinates out of boundary');
            done();
        });
    });

    describe('/draw line with over limit cordinate', () => {
        it('it should return false for over limit cordinates', (done) => {
            const resp = draw.validateLineCordinates(1, 8, 6, 3)
            assert.equal(resp.success, false);
            assert.equal(resp.msg, 'cordinates out of boundary');
            done();
        });
    });

    describe('/draw horizontal line', () => {
        it('it should fill canvas data for the given horizontal line cordinates', (done) => {
            draw.drawLine(1, 2, 6, 2);
            assert.equal(draw.canvasData[2][1],'*');
            assert.equal(draw.canvasData[2][2],'*');
            assert.equal(draw.canvasData[2][3],'*');
            assert.equal(draw.canvasData[2][4],'*');
            assert.equal(draw.canvasData[2][5],'*');
            assert.equal(draw.canvasData[2][6],'*');
            assert.equal(draw.canvasData[2][7],' ');
            done();
        });
    });

    describe('/draw vertical line', () => {
        it('it should fill canvas data for the given vertical line cordinates', (done) => {
            draw.drawLine(6, 1, 6, 4);
            assert.equal(draw.canvasData[1][6],'*');
            assert.equal(draw.canvasData[2][6],'*');
            assert.equal(draw.canvasData[3][6],'*');
            assert.equal(draw.canvasData[4][6],'*');
            done();
        });
    });

    describe('/draw rectangle with invalid cordinate', () => {
        it('it should return false for invalid rectangle cordinates', (done) => {
            const resp = draw.validateRectangleCordinates(18, 1, 14, 3)
            assert.equal(resp.success, false);
            done();
        });
    });    

    describe('/draw rectangle', () => {
        it('it should fill canvas data for the given rectangle cordinates', (done) => {
            draw.drawRectangle(14, 1, 18, 3);
            assert.equal(draw.canvasData[1][14],'*');
            assert.equal(draw.canvasData[1][15],'*');
            assert.equal(draw.canvasData[1][16],'*');
            assert.equal(draw.canvasData[1][17],'*');
            assert.equal(draw.canvasData[1][18],'*');
            assert.equal(draw.canvasData[2][14],'*');
            assert.equal(draw.canvasData[2][15],' ');
            assert.equal(draw.canvasData[2][16],' ');
            assert.equal(draw.canvasData[2][17],' ');
            assert.equal(draw.canvasData[2][18],'*');
            assert.equal(draw.canvasData[3][14],'*');
            assert.equal(draw.canvasData[3][15],'*');
            assert.equal(draw.canvasData[3][16],'*');
            assert.equal(draw.canvasData[3][17],'*');
            assert.equal(draw.canvasData[3][18],'*');
            done();
        });
    });

});    
