function resizeImage(cv, matSrc) {
  let resizedImg = new cv.Mat();
  let sz = new cv.Size(345, (matSrc.size().height * 345) / matSrc.size().width);
  cv.resize(matSrc, resizedImg, sz);
  cv.cvtColor(resizedImg, resizedImg, cv.COLOR_RGBA2GRAY);
  return resizedImg;
}
function detectCircles(cv, matSrc) {
  const imgMat = matSrc.clone();
  // cv.medianBlur(matSrc, imgMat, 1);
  cv.threshold(imgMat, imgMat, 130, 255, cv.THRESH_OTSU);

  let kernel = cv.Mat.ones(1, 1, cv.CV_8U);
  cv.erode(imgMat, imgMat, kernel);

  // cv.imshow('workingCanvas', imgMat);

  // log('imgMat',imgMat);

  let circles = new cv.Mat();
  cv.HoughCircles(imgMat, circles, cv.HOUGH_GRADIENT, 1, 20, 15, 11, 7.5, 15);
  let circleArray = [];

  let totalX = 0;
  for (let i = 0; i < circles.cols; i++) {
    let x = circles.data32F[i * 3];
    totalX += x;
  }

  const averageX = totalX / circles.cols;

  for (let i = 0; i < circles.cols; i++) {
    let x = circles.data32F[i * 3];
    let y = circles.data32F[i * 3 + 1];
    let radius = circles.data32F[i * 3 + 2];
    let center = new cv.Point(x, y);

    if (x > averageX - 68) {
      circleArray.push({ center: center, radius: radius });
    }
  }

  circleArray.sort(
    (firstItem, secondItem) => firstItem.center.y - secondItem.center.y
  );

  circles.delete();
  imgMat.delete();
  return circleArray;
}

export function processImage(cv, img) {
  const matsrc = cv.imread(img);
  const resized = resizeImage(cv, matsrc);
  const detectedCircled = detectCircles(cv, resized);
  
}