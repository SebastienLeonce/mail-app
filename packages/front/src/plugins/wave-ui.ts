export default interface WaveUI {
    breakpoint: {
        lg: boolean
        md: boolean
        name: "lg" | "md" | "sm" | "xl" | "xs",
        sm: boolean
        width: number
        xl: boolean
        xs: boolean
    },
    notify: (message : string, type?: 'info' |'success' | 'warning' | 'error', timeout?:number) => void
}