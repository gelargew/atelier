import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { simplex2d, simplex3d } from "./simplex";
import * as THREE from "three";

export const FigureMaterial = shaderMaterial(
  {
    uImage: null,
    uImageHover: null,
    uMouse: new THREE.Vector2(0, 0),
    uTime: 0,
    uRes: [800, 600],
    dpr: [16 / 9],
  },
  `
    varying vec2 vUv;
    void main()	{
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
  `
    uniform vec2 uMouse;
    uniform vec2 uRes;
    uniform sampler2D uImage;
    uniform sampler2D uImageHover;
    uniform float uTime;
    uniform float dpr;

    varying vec2 vUv;

    ${simplex3d}

    float circle(in vec2 _st, in float _radius, in float blurriness) {
        vec2 dist = _st;
        return 1.-smoothstep(_radius-(_radius*blurriness), _radius+(_radius*blurriness), dot(dist,dist)*4.0);
    }

    void main() {
        // We manage the device ratio by passing PR constant
        vec2 res = uRes* dpr;
        vec2 st = gl_FragCoord.xy / res.xy - vec2(0.5);
        // tip: use the following formula to keep the good ratio of your coordinates
        st.y *= res.y / res.x;
    
        // We readjust the mouse coordinates
        vec2 mouse = (uMouse * -.6)+.1;

        // tip2: do the same for your mouse
        mouse.y*= res.y/res.x;

        //noise

        float offx = vUv.x + sin(vUv.y + uTime * .1);
        float offy = vUv.y - uTime * .1 - cos(uTime * .001) * .01;
        float n = snoise(vec3(offx*0.8, offy/2., uTime * .04) * 8.) - .8;
    
        vec2 circlePos = st + mouse;
        float c = circle(circlePos, .1, 8.) * 2.5;

        float finalMask = smoothstep(0.4, 0.5, n + pow(c, 2.));

        vec4 image = vec4(texture2D(uImage, vUv));
        vec4 hover = vec4(texture2D(uImageHover, vUv));
        image += (image * 2.);
        hover += (hover * 1.);

        vec4 finalImage = mix(image, hover/2., finalMask);
        
        gl_FragColor = finalImage;
    }

    `
);
