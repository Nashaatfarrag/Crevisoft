import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/App.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    });
    // console.log(wrapper)
    expect(wrapper);
  });
});
