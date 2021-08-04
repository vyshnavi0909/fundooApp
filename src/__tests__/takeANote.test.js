import TakeANote from "../components/take-a-note/TakeANote";
import { mount, shallow } from "enzyme";
import "../setupTests";

const withoutChildernComp = shallow(<TakeANote />);
const withChildernComp = mount(<TakeANote />);

describe("test using mount method", () => {
  it("if main container of take a note is loaded", () => {
    expect(withChildernComp.find(".take-a-note").exists()).toBe(true);
  });

  it("testcase to know icon bar is loaded or not", () => {
    expect(withChildernComp.find(".before-click").exists()).toBe(true);
  });
});

// describe("test using shallow method", () => {
//   it("main container of take a note is loaded using shallow", () => {
//     expect(withoutChildernComp.find(".before-click").exists()).toBe(true);
//   });
// });
