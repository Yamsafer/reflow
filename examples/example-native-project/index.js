const { DOMParser } =  require('xmldom');
const xpath = require('xpath');

const sourceXML = `
<?xml version="1.0" encoding="UTF-8"?><AppiumAUT><XCUIElementTypeApplication type="XCUIElementTypeApplication" name=" " label=" " enabled="true" visible="true" x="0" y="0" width="375" height="667">
  <XCUIElementTypeWindow type="XCUIElementTypeWindow" enabled="true" visible="false" x="0" y="0" width="375" height="667">
    <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667">
      <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667"/>
    </XCUIElementTypeOther>
  </XCUIElementTypeWindow>
  <XCUIElementTypeWindow type="XCUIElementTypeWindow" enabled="true" visible="false" x="0" y="0" width="375" height="667">
    <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667">
      <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667">
        <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667"/>
      </XCUIElementTypeOther>
    </XCUIElementTypeOther>
    <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667"/>
  </XCUIElementTypeWindow>
  <XCUIElementTypeWindow type="XCUIElementTypeWindow" enabled="true" visible="false" x="0" y="0" width="375" height="667">
    <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="0" height="0">
      <XCUIElementTypeIcon type="XCUIElementTypeIcon" enabled="true" visible="false" x="-11" y="-2" width="82" height="88"/>
      <XCUIElementTypeIcon type="XCUIElementTypeIcon" enabled="true" visible="false" x="-5" y="-2" width="71" height="88"/>
      <XCUIElementTypeIcon type="XCUIElementTypeIcon" enabled="true" visible="false" x="-5" y="-2" width="71" height="88"/>
      <XCUIElementTypeIcon type="XCUIElementTypeIcon" enabled="true" visible="false" x="-4" y="-2" width="68" height="88"/>
      <XCUIElementTypeIcon type="XCUIElementTypeIcon" enabled="true" visible="false" x="-4" y="-2" width="68" height="88"/>
      <XCUIElementTypeIcon type="XCUIElementTypeIcon" enabled="true" visible="false" x="-2" y="-2" width="64" height="78"/>
      <XCUIElementTypeIcon type="XCUIElementTypeIcon" enabled="true" visible="false" x="-2" y="-2" width="64" height="78"/>
      <XCUIElementTypeIcon type="XCUIElementTypeIcon" enabled="true" visible="false" x="-2" y="-2" width="64" height="88"/>
      <XCUIElementTypeIcon type="XCUIElementTypeIcon" enabled="true" visible="false" x="-2" y="-2" width="64" height="88"/>
      <XCUIElementTypeIcon type="XCUIElementTypeIcon" enabled="true" visible="false" x="-2" y="-2" width="64" height="88"/>
      <XCUIElementTypeIcon type="XCUIElementTypeIcon" enabled="true" visible="false" x="-2" y="-2" width="64" height="88"/>
      <XCUIElementTypeIcon type="XCUIElementTypeIcon" enabled="true" visible="false" x="-2" y="-2" width="64" height="88"/>
      <XCUIElementTypeIcon type="XCUIElementTypeIcon" enabled="true" visible="false" x="-2" y="-2" width="64" height="88"/>
      <XCUIElementTypeIcon type="XCUIElementTypeIcon" enabled="true" visible="false" x="-2" y="-2" width="64" height="88"/>
      <XCUIElementTypeIcon type="XCUIElementTypeIcon" enabled="true" visible="false" x="-2" y="-2" width="64" height="88"/>
      <XCUIElementTypeIcon type="XCUIElementTypeIcon" enabled="true" visible="false" x="-2" y="-2" width="64" height="88"/>
      <XCUIElementTypeIcon type="XCUIElementTypeIcon" enabled="true" visible="false" x="-2" y="-2" width="64" height="88"/>
      <XCUIElementTypeIcon type="XCUIElementTypeIcon" enabled="true" visible="false" x="-2" y="-2" width="64" height="88"/>
      <XCUIElementTypeIcon type="XCUIElementTypeIcon" enabled="true" visible="false" x="-2" y="-2" width="64" height="88"/>
      <XCUIElementTypeIcon type="XCUIElementTypeIcon" enabled="true" visible="false" x="-2" y="-2" width="64" height="88"/>
      <XCUIElementTypeIcon type="XCUIElementTypeIcon" enabled="true" visible="false" x="-2" y="-2" width="64" height="88"/>
      <XCUIElementTypeIcon type="XCUIElementTypeIcon" enabled="true" visible="false" x="-2" y="-2" width="64" height="88"/>
      <XCUIElementTypeIcon type="XCUIElementTypeIcon" enabled="true" visible="false" x="-2" y="-2" width="64" height="88"/>
      <XCUIElementTypeIcon type="XCUIElementTypeIcon" enabled="true" visible="false" x="-2" y="-2" width="64" height="88"/>
      <XCUIElementTypeIcon type="XCUIElementTypeIcon" enabled="true" visible="false" x="-2" y="-2" width="64" height="88"/>
      <XCUIElementTypeIcon type="XCUIElementTypeIcon" enabled="true" visible="false" x="-2" y="-2" width="64" height="88"/>
      <XCUIElementTypeIcon type="XCUIElementTypeIcon" enabled="true" visible="false" x="-2" y="-2" width="64" height="88"/>
      <XCUIElementTypeIcon type="XCUIElementTypeIcon" enabled="true" visible="false" x="-2" y="-2" width="64" height="88"/>
      <XCUIElementTypeIcon type="XCUIElementTypeIcon" enabled="true" visible="false" x="-2" y="-2" width="64" height="88"/>
      <XCUIElementTypeIcon type="XCUIElementTypeIcon" value="0 apps" name="(null) folder" label="(null) folder" enabled="true" visible="false" x="-2" y="-2" width="64" height="88"/>
      <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="60" height="60"/>
      <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="60" height="60"/>
      <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="-7" y="68" width="9" height="9">
        <XCUIElementTypeImage type="XCUIElementTypeImage" enabled="true" visible="false" x="-7" y="68" width="9" height="9"/>
        <XCUIElementTypeImage type="XCUIElementTypeImage" enabled="true" visible="false" x="-7" y="68" width="9" height="9"/>
      </XCUIElementTypeOther>
    </XCUIElementTypeOther>
    <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667"/>
  </XCUIElementTypeWindow>
  <XCUIElementTypeWindow type="XCUIElementTypeWindow" enabled="true" visible="false" x="0" y="0" width="375" height="667">
    <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667">
      <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667">
        <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667">
          <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667">
            <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667">
              <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667">
                <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667">
                  <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667">
                    <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667">
                      <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667"/>
                      <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667">
                        <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667">
                          <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667"/>
                          <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667"/>
                        </XCUIElementTypeOther>
                      </XCUIElementTypeOther>
                    </XCUIElementTypeOther>
                  </XCUIElementTypeOther>
                </XCUIElementTypeOther>
              </XCUIElementTypeOther>
            </XCUIElementTypeOther>
          </XCUIElementTypeOther>
        </XCUIElementTypeOther>
      </XCUIElementTypeOther>
    </XCUIElementTypeOther>
  </XCUIElementTypeWindow>
  <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="750" height="1334">
    <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="750" height="1334">
      <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="750" height="1334">
        <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="750" height="1334">
          <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="750" height="1334"/>
        </XCUIElementTypeOther>
      </XCUIElementTypeOther>
      <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="750" height="1334">
        <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="750" height="1334">
          <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="750" height="1334"/>
        </XCUIElementTypeOther>
      </XCUIElementTypeOther>
      <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="750" height="1334">
        <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="750" height="1334">
          <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="750" height="1334"/>
        </XCUIElementTypeOther>
      </XCUIElementTypeOther>
      <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="750" height="1334"/>
      <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="750" height="1334">
        <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="750" height="1334"/>
      </XCUIElementTypeOther>
      <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="750" height="1334">
        <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="750" height="1334"/>
      </XCUIElementTypeOther>
      <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="750" height="1334">
        <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="750" height="1334"/>
      </XCUIElementTypeOther>
      <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="750" height="1334">
        <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="750" height="1334">
          <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="750" height="1334"/>
        </XCUIElementTypeOther>
      </XCUIElementTypeOther>
      <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="750" height="1334">
        <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="750" height="1334">
          <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="750" height="1334"/>
        </XCUIElementTypeOther>
      </XCUIElementTypeOther>
      <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="750" height="1334">
        <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="750" height="1334">
          <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="750" height="1334"/>
        </XCUIElementTypeOther>
      </XCUIElementTypeOther>
      <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="750" height="1334">
        <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="750" height="1334">
          <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="750" height="1334"/>
        </XCUIElementTypeOther>
      </XCUIElementTypeOther>
    </XCUIElementTypeOther>
    <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="750" height="1334"/>
  </XCUIElementTypeOther>
  <XCUIElementTypeWindow type="XCUIElementTypeWindow" name="SBSwitcherWindow" enabled="true" visible="false" x="0" y="0" width="375" height="667">
    <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667">
      <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667">
        <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667">
          <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667">
            <XCUIElementTypeScrollView type="XCUIElementTypeScrollView" enabled="true" visible="false" x="0" y="0" width="375" height="667"/>
            <XCUIElementTypeOther type="XCUIElementTypeOther" name="AppSwitcherContentView" enabled="true" visible="false" x="0" y="0" width="375" height="667">
              <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="-375" y="-667" width="1125" height="2001"/>
              <XCUIElementTypeOther type="XCUIElementTypeOther" value="Active" name="Yamsafer" label="Yamsafer" enabled="true" visible="false" x="0" y="0" width="375" height="667">
                <XCUIElementTypeScrollView type="XCUIElementTypeScrollView" enabled="true" visible="false" x="0" y="-334" width="375" height="1001">
                  <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="767">
                    <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667"/>
                    <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667">
                      <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667">
                        <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667">
                          <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667">
                            <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667"/>
                          </XCUIElementTypeOther>
                        </XCUIElementTypeOther>
                      </XCUIElementTypeOther>
                    </XCUIElementTypeOther>
                    <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667"/>
                  </XCUIElementTypeOther>
                </XCUIElementTypeScrollView>
                <XCUIElementTypeButton type="XCUIElementTypeButton" name="appCloseBox" label="Close Yamsafer" enabled="true" visible="false" x="-14" y="-14" width="28" height="28">
                  <XCUIElementTypeImage type="XCUIElementTypeImage" enabled="true" visible="false" x="-14" y="-14" width="28" height="28"/>
                </XCUIElementTypeButton>
              </XCUIElementTypeOther>
            </XCUIElementTypeOther>
          </XCUIElementTypeOther>
        </XCUIElementTypeOther>
      </XCUIElementTypeOther>
    </XCUIElementTypeOther>
  </XCUIElementTypeWindow>
  <XCUIElementTypeWindow type="XCUIElementTypeWindow" enabled="true" visible="false" x="0" y="0" width="375" height="667">
    <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667">
      <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="667" width="375" height="216"/>
    </XCUIElementTypeOther>
  </XCUIElementTypeWindow>
  <XCUIElementTypeWindow type="XCUIElementTypeWindow" enabled="true" visible="true" x="0" y="0" width="375" height="667">
    <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667"/>
    <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667"/>
    <XCUIElementTypeAny type="XCUIElementTypeAny" enabled="true" visible="false" x="inf" y="inf" width="0" height="0">
      <XCUIElementTypeAny type="XCUIElementTypeAny" enabled="true" visible="false" x="inf" y="inf" width="0" height="0"/>
      <XCUIElementTypeAny type="XCUIElementTypeAny" enabled="true" visible="false" x="inf" y="inf" width="0" height="0"/>
      <XCUIElementTypeAlert type="XCUIElementTypeAlert" name="“Yamsafer” Would Like to Send You Notifications" label="“Yamsafer” Would Like to Send You Notifications" enabled="true" visible="false" x="0" y="0" width="0" height="0">
        <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="0" height="0">
          <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="0" height="0">
            <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="0" height="0">
              <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="0" height="0"/>
              <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="0" height="0">
                <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="0" height="0"/>
                <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="0" height="0"/>
              </XCUIElementTypeOther>
            </XCUIElementTypeOther>
            <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="0" height="0">
              <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="0" height="0">
                <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="0" height="0">
                  <XCUIElementTypeStaticText type="XCUIElementTypeStaticText" value="“Yamsafer” Would Like to Send You Notifications" name="“Yamsafer” Would Like to Send You Notifications" label="“Yamsafer” Would Like to Send You Notifications" enabled="true" visible="false" x="0" y="0" width="0" height="0"/>
                  <XCUIElementTypeStaticText type="XCUIElementTypeStaticText" value="Notifications may include alerts, sounds, and icon badges. These can be configured in Settings." name="Notifications may include alerts, sounds, and icon badges. These can be configured in Settings." label="Notifications may include alerts, sounds, and icon badges. These can be configured in Settings." enabled="true" visible="false" x="68" y="308" width="239" height="55"/>
                </XCUIElementTypeOther>
              </XCUIElementTypeOther>
              <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="0" height="0">
                <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="0" height="0"/>
                <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="0" height="0"/>
              </XCUIElementTypeOther>
              <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="0" height="0">
                <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="0" height="0">
                  <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="0" height="0">
                    <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="0" height="0">
                      <XCUIElementTypeButton type="XCUIElementTypeButton" name="Don’t Allow" label="Don’t Allow" enabled="true" visible="false" x="0" y="0" width="0" height="0"/>
                    </XCUIElementTypeOther>
                    <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="0" height="0">
                      <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="0" height="0"/>
                      <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="0" height="0"/>
                    </XCUIElementTypeOther>
                    <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="0" height="0">
                      <XCUIElementTypeButton type="XCUIElementTypeButton" name="Allow" label="Allow" enabled="true" visible="false" x="0" y="0" width="0" height="0"/>
                    </XCUIElementTypeOther>
                  </XCUIElementTypeOther>
                </XCUIElementTypeOther>
              </XCUIElementTypeOther>
            </XCUIElementTypeOther>
          </XCUIElementTypeOther>
        </XCUIElementTypeOther>
      </XCUIElementTypeAlert>
    </XCUIElementTypeAny>
    <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="true" x="0" y="0" width="375" height="667">
      <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="true" x="0" y="0" width="375" height="667"/>
      <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667"/>
      <XCUIElementTypeAlert type="XCUIElementTypeAlert" name="Allow “Yamsafer” to access your location?" label="Allow “Yamsafer” to access your location?" enabled="true" visible="true" x="52" y="214" width="271" height="239">
        <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="true" x="52" y="214" width="271" height="239">
          <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="true" x="52" y="214" width="271" height="239">
            <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="52" y="214" width="271" height="239">
              <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="52" y="214" width="271" height="239"/>
              <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="52" y="214" width="271" height="239">
                <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="52" y="214" width="271" height="239"/>
                <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="52" y="214" width="271" height="239"/>
              </XCUIElementTypeOther>
            </XCUIElementTypeOther>
            <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="true" x="52" y="214" width="271" height="239">
              <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="true" x="52" y="214" width="271" height="106">
                <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="true" x="52" y="214" width="271" height="106">
                  <XCUIElementTypeStaticText type="XCUIElementTypeStaticText" value="Allow “Yamsafer” to access your location?" name="Allow “Yamsafer” to access your location?" label="Allow “Yamsafer” to access your location?" enabled="true" visible="true" x="68" y="233" width="239" height="49"/>
                  <XCUIElementTypeStaticText type="XCUIElementTypeStaticText" value="To show nearby hotels" name="To show nearby hotels" label="To show nearby hotels" enabled="true" visible="true" x="68" y="282" width="239" height="19"/>
                </XCUIElementTypeOther>
              </XCUIElementTypeOther>
              <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="true" x="52" y="319" width="271" height="1">
                <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="true" x="52" y="319" width="271" height="1"/>
                <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="true" x="52" y="319" width="271" height="1"/>
              </XCUIElementTypeOther>
              <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="true" x="52" y="320" width="271" height="133">
                <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="true" x="52" y="320" width="271" height="133">
                  <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="true" x="52" y="320" width="271" height="133">
                    <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="true" x="52" y="320" width="271" height="44">
                      <XCUIElementTypeButton type="XCUIElementTypeButton" name="Only While Using the App" label="Only While Using the App" enabled="true" visible="true" x="52" y="320" width="271" height="44"/>
                    </XCUIElementTypeOther>
                    <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="true" x="52" y="364" width="271" height="1">
                      <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="true" x="52" y="364" width="271" height="1"/>
                      <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="true" x="52" y="364" width="271" height="1"/>
                    </XCUIElementTypeOther>
                    <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="true" x="52" y="364" width="271" height="45">
                      <XCUIElementTypeButton type="XCUIElementTypeButton" name="Always Allow" label="Always Allow" enabled="true" visible="true" x="52" y="364" width="271" height="45"/>
                    </XCUIElementTypeOther>
                    <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="true" x="52" y="408" width="271" height="1">
                      <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="true" x="52" y="408" width="271" height="1"/>
                      <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="true" x="52" y="408" width="271" height="1"/>
                    </XCUIElementTypeOther>
                    <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="true" x="52" y="409" width="271" height="44">
                      <XCUIElementTypeButton type="XCUIElementTypeButton" name="Don’t Allow" label="Don’t Allow" enabled="true" visible="true" x="52" y="409" width="271" height="44"/>
                    </XCUIElementTypeOther>
                  </XCUIElementTypeOther>
                </XCUIElementTypeOther>
              </XCUIElementTypeOther>
            </XCUIElementTypeOther>
          </XCUIElementTypeOther>
        </XCUIElementTypeOther>
      </XCUIElementTypeAlert>
    </XCUIElementTypeOther>
  </XCUIElementTypeWindow>
  <XCUIElementTypeWindow type="XCUIElementTypeWindow" enabled="true" visible="false" x="0" y="0" width="375" height="667">
    <XCUIElementTypeOther type="XCUIElementTypeOther" enabled="true" visible="false" x="0" y="0" width="375" height="667"/>
  </XCUIElementTypeWindow>
</XCUIElementTypeApplication></AppiumAUT>
`

function findElement(selector) {
  const doc = new DOMParser().parseFromString(sourceXML);
  return xpath.select(selector, doc);
}

console.log('element::', findElement('//XCUIElementTypeAlert//XCUIElementTypeButton[@name="Always Allow"]').length);
console.log('element::', findElement('//XCUIElementTypeAlert//XCUIElementTypeButton[@name="Allow"]').length);

