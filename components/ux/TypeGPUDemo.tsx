import { useEffect } from "react";
import { Canvas, useDevice, useGPUContext } from "react-native-wgpu";
import tgpu from "typegpu";
import * as d from "typegpu/data";

const mainVertex = tgpu["~unstable"].vertexFn({
  in: { vertexIndex: d.builtin.vertexIndex },
  out: { outPos: d.builtin.position, uv: d.vec2f },
})/* wgsl */ `{
  var pos = array<vec2f, 3>(vec2(0.0, 0.5), vec2(-0.5, -0.5), vec2(0.5, -0.5));
  var uv = array<vec2f, 3>(vec2(0.5, 1.0), vec2(0.0, 0.0), vec2(1.0, 0.0));
  return Out(vec4f(pos[in.vertexIndex], 0.0, 1.0), uv[in.vertexIndex]);
}`;

const blue = d.vec4f(0.114, 0.447, 0.941, 1);
const mainFragment = tgpu["~unstable"].fragmentFn({
  in: { uv: d.vec2f },
  out: d.vec4f,
})`{ return blue; }`.$uses({ blue });

export function Triangle() {
  const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
  const { device = null } = useDevice();
  const root = device ? tgpu.initFromDevice({ device }) : null;
  const { ref, context } = useGPUContext();

  useEffect(() => {
    if (!root || !device || !context) {
      return;
    }

    context.configure({
      device: device,
      format: presentationFormat,
      alphaMode: "premultiplied",
    });

    root["~unstable"]
      .withVertex(mainVertex, {})
      .withFragment(mainFragment, { format: presentationFormat })
      .createPipeline()
      .withColorAttachment({
        view: context.getCurrentTexture().createView(),
        clearValue: [0, 0, 0, 0],
        loadOp: "clear",
        storeOp: "store",
      })
      .draw(3);

    context.present();
  }, [root, device, context, presentationFormat]);

  return (
    <>
      <Canvas />
      <Canvas ref={ref} style={{ aspectRatio: 1 }} transparent />
    </>
  );
}
