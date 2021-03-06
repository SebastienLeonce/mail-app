declare module 'wave-ui' {
    import Vue, {
        PluginFunction
    } from 'vue';

    interface Colors {
        primary ? : string;
        secondary ? : string;
    }

    interface Breakpoints {
        xs ? : number;
        sm ? : number;
        md ? : number;
        lg ? : number;
    }

    interface Presets {
        sm ? : boolean;
        outlined ? : boolean;
        round ? : boolean;
    }

    interface ConstructorOptions {
        colors ? : Colors;
        breakpoints ? : Breakpoints;
        presets ? : Presets;
    }

    export declare class WaveUI extends Vue {

        constructor(app: App < Element > , options ? : ConstructorOptions);
        static install: PluginFunction < unknown > ;
        static version: string;

        breakpoint: {
            lg: boolean
            md: boolean
            name: "lg" | "md" | "sm" | "xl" | "xs",
            sm: boolean
            width: number
            xl: boolean
            xs: boolean
        }

        notify: (message : string, type?: 'info' |'success' | 'warning' | 'error', timeout?:number) => void
    }

    declare module 'vue/types/options' {
        import Vue, {
            ComponentOptions
        } from 'vue';
        export interface ComponentOptions <
            V extends Vue,
            Data = DefaultData < V > ,
            Methods = DefaultMethods < V > ,
            Computed = DefaultComputed,
            PropsDef = PropsDefinition < DefaultProps > ,
            Props = DefaultProps > {
                waveui ? : WaveUI
            }
    }

    export default WaveUI;
}