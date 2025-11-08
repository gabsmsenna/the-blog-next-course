type Props = {
    className?: string;
}

export function SpinLoader({ className = '' }: Props) {
    return (
        <div className={'flex items-center justify-center ' + className}>
            <div className="w-10 h-10 border-5 border-t-transparent border-slate-900 rounded-4xl animate-spin">
            </div>    
        </div>
    )
}