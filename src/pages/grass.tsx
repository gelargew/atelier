import s from '../styles/typographyLanding.module.css'
import gsap, { Expo } from 'gsap'
import { useEffect, useRef } from 'react'

export default function () {
    const textWrapper = useRef<HTMLDivElement>(null!)
    const texts = gsap.utils.selector(textWrapper)
    const textContainer = useRef<HTMLDivElement>(null!)
    const header = useRef<HTMLDivElement>(null!)
    const sectionRef = useRef<HTMLDivElement>(null!)

    const animate = () => {
        gsap.to(texts('p'), {
            x: 500,
            ease: Expo.easeInOut,
            delay: 1,
            stagger: 0.1,
            duration: 1
        })
        gsap.to(textWrapper.current, {
            duration: 3,
            y: -600,
            scale: 4.5,
            rotate: -90,
            ease: Expo.easeInOut,
            delay: 1.5
        })
        gsap.to(texts('p'), {
            duration: 1,
            ease: Expo.easeInOut
        })
        gsap.to(texts('p'), {
            duration: 4,
            x: -3500,
            ease: Expo.easeInOut,
            delay: 3.5,
            stagger: 0.05,
            opacity: 1
        })
        gsap.to(textContainer.current, {
            duration: 2,
            bottom: '-100%',
            ease: Expo.easeInOut,
            delay: 6
        })
        gsap.fromTo(header.current, {
            opacity: 0,
            y: 100
        }, {
            duration: 3,
            opacity: 1,
            y: 0,
            delay: 7.4,
            ease: 'expo'
        })


    }

    useEffect(() => {
        animate()
    })



    return (
        <main className={s.main} >
            <div className={s.textContainer} ref={textContainer} ></div>
            <div className={s.textWrapper} ref={textWrapper} >
                <p>
                    It is necessary but it might also be a must to have at least two teeth for people in the age of sixty. The food is too rash and scary might the slashe hand and torso.
                </p>
                <p>
                    The amount of vitamin C in a fried chicken is arguably good enough for a cat to survive until the age of desperation. Meanwhile the statue of liberty is actually not a cat.
                </p>
                <p>

                    She had to start saving in October so she could afford to buy Christmas.
                </p>
                <p>
                 I realized that the darkness had eroded my confidence.
                </p>

                <p>
                    They say Life is too short
                    The here and the now          
                </p>

                <p>
                    I used to be frightened of dying
                    I used to think death was the end
                    But that was before
                    Im not scared anymore
                    I know that my soul will transcend                   
                </p>

                <p>
                    Safe in the light that surrounds me
                    Free of the fear and the pain
                    My questioning mind
                    Has helped me to find
                    The meaning in my life again
                    Victorias real
                    I finally feel                  
                </p>
                <p>
                    Where did we come from?
                    Why are we here?
                    Where do we go when we die?
                    What lies beyond
                    And what lay before?
                    Is anything certain in life?
                </p>
                <p>
                    It is necessary but it might also be a must to have at least two teeth for people in the age of sixty. The food is too rash and scary might the slashe hand and torso.
                </p>
                <p>
                    The amount of vitamin C in a fried chicken is arguably good enough for a cat to survive until the age of desperation. Meanwhile the statue of liberty is actually not a cat.
                </p>
                <p>
                    Tom is wearing clothes that are too big for him.
                    She had to start saving in October so she could afford to buy Christmas presents for all her family and friends.
                </p>
                <p>
                    As I stood alone in that deserted place, I realized that the darkness had eroded my confidence, hands shaking violently.
                </p>

                <p>
                    They say Life is too short
                    The here and the now
                    And You re only given one shot
                    But could there be more
                    Have I lived before
                    Or could this be all that we ve got?                   
                </p>

                <p>
                    I used to be frightened of dying
                    I used to think death was the end
                    But that was before
                    Im not scared anymore
                    I know that my soul will transcend                   
                </p>

                <p>
                    Safe in the light that surrounds me
                    Free of the fear and the pain
                    My questioning mind
                    Has helped me to find
                    The meaning in my life again
                    Victorias real
                    I finally feel                  
                </p>
                <p>
                    Where did we come from?
                    Why are we here?
                    Where do we go when we die?
                    What lies beyond
                    And what lay before?
                    Is anything certain in life?
                </p>
            </div>


                <section style={{ position: 'relative'}} >
                    <div className={s.header} ref={header} >Grass</div>
                </section>
                <section>
                    asdkaosdka
                </section>
                <section>
                    asdkaosdka
                </section>
                <section>
                    asdkaosdka
                </section>
                <section>
                    asdkaosdka
                </section>


        </main>
    )
}