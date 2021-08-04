import { mount, shallow } from "enzyme";
import DisplayNotes from "../components/display-notes/DisplayNotes";
import Notes from "../components/notes/Notes";
import TakeANote from "../components/take-a-note/TakeANote";
import "../setupTests";

const withoutChildernComp = shallow(<Notes />);
const withChildernComp = mount(<Notes />);

describe("testing Notes using mount method", () => {
  it("create note loaded", () => {
    expect(withChildernComp.find(".note-taker-div").exists()).toBe(true);
  });
  it("display notes loaded", () => {
    expect(withChildernComp.find(".cards-container").exists()).toBe(true);
  });
  it("Display notes component loaded", () => {
    expect(withChildernComp.find(DisplayNotes).exists()).toBe(true);
  });
  it("child inside display notes is loaded", () => {
    expect(withChildernComp.find(".displaynotes").exists()).toBe(true);
  });
});

describe("testing notes using shallow method", () => {
  it("create note is loaded with shallow", () => {
    expect(withoutChildernComp.find(".note-taker-div").exists()).toBe(true);
  });

  it("Take a note component loaded", () => {
    expect(withoutChildernComp.find(TakeANote).exists()).toBe(true);
  });

  it("child inside take a note component", () => {
    expect(withoutChildernComp.find(".before-click").exists()).toBe(false);
  });
});
