import {mockForkSuites} from '../reflow/mock-fork'

const basicTree = {
  name: "Fork Root",
  type: "fork",
  before() {
    console.log("Fork Root Before Hook Called.")
  },
  suites: mockForkSuites,
}

export default basicTree