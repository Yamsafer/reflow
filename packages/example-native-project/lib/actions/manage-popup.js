while(findElements("//*[@class='android.widget.Button'][2]"))
  //allow
while(findElements("//*[@class='android.widget.Button'][1]"))
  //deny


module.exports = function(driver) {
  if (driver.findElementByXPath("//XCUIElementTypeAlert[1]").isDisplayed()) {
    console.info("Alert is present");
    WebDriverWait wait = new WebDriverWait(driver, 200);
    wait.until(alertIsPresent());
    driver.switchTo().alert().accept();

  } else {
    console.info("Alert is not present");
  }
}
