import AppBar from './AppBar';

export default function Layout({children}){
    return(
            <div >
                <AppBar>
                    {children}
                </AppBar>
            </div>

    )
}
