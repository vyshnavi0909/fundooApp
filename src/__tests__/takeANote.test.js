import TakeANote from "../components/take-a-note/TakeANote";
import { mount, shallow } from "enzyme";
import "../setupTests";

const withChildernComp = mount(<TakeANote />);

describe("test if containers a loading in take a note component using mount", () => {
  it("test if main container of take a note is loaded", () => {
    expect(withChildernComp.find(".take-a-note").exists()).toBe(true);
  });

  it("test if take a note before click is loaded", () => {
    expect(withChildernComp.find(".before-click").exists()).toBe(true);
  });

  it("test if take a note dialog box is loaded before it is clicked", () => {
    expect(withChildernComp.find(".after-click").exists()).toBe(false);
  });
});

describe("test if click events in take a note are working", () => {
  it("test if click of take a note div is working", () => {
    const closedDiv = withChildernComp.find(".take-a-note");
    closedDiv.simulate("click");
    withChildernComp.update();
    const openedDiv = withChildernComp.find(".after-click");
    expect(openedDiv.exists()).toBe(true);
  });

  // it("test if user account popper loaded after click", () => {
  //   const account = withChildernComp.find(".")
  // })
});
