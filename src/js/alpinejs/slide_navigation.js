import Alpine from 'alpinejs'

const SETTINGS = {
    init() {
        this.$nextTick(() => {
            const $wrapper = this.$root.querySelector('.w-sn__wrapper')
            const $activeScene = $wrapper.querySelector(
                `.w-sn__item[x-data][data-scene="${this.activeScene}"]`
            )

            $wrapper.style.height = `${$activeScene.offsetHeight}px`
        })
    },
    nextScene(nextScene) {
        this.activeScene = nextScene

        this.$nextTick(() => {
            let $wrapper = this.$root.parentElement
            let $nextScene = $wrapper.querySelector(
                `.w-sn__item[x-data][data-scene="${nextScene}"]`
            )

            $wrapper.style.height = `${$nextScene.offsetHeight}px`
        })
    },
    prevScene() {
        let parent = this.scenes[this.$root.dataset.scene].parent

        this.activeScene = parent

        this.$nextTick(() => {
            let $wrapper = this.$root.parentElement
            let $parent = $wrapper.querySelector(
                `.w-sn__item[x-data][data-scene="${parent}"]`
            )

            $wrapper.style.height = `${$parent.offsetHeight}px`
        })
    },
    sceneClasses() {
        return {
            'w-sn__item--active': this.$root.dataset.scene === this.activeScene,
            'w-sn__item--parent':
                this.scenes[this.activeScene].parent ===
                this.$root.dataset.scene
        }
    }
}

Alpine.data('sn_00', function () {
    return {
        ...SETTINGS,
        activeScene: this.$persist('scene_4'),
        scenes: {
            scene_0: {},
            scene_1: { parent: 'scene_0', condition: false },
            scene_2: { parent: 'scene_1' },
            scene_3: { parent: 'scene_1' },
            scene_4: { parent: 'scene_1' },
            scene_5: { parent: 'scene_0' }
        }
    }
})
