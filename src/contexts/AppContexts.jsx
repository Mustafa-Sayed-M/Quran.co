import { ChapterContextProvider } from "./ChapterContext";
import { SettingContextProvider } from "./SettingContext";
import { TafsirContextProvider } from "./TafsirContext";

function AppContexts({ children }) {
    return (
        <SettingContextProvider>
            <ChapterContextProvider>
                <TafsirContextProvider>
                    {children}
                </TafsirContextProvider>
            </ChapterContextProvider>
        </SettingContextProvider>
    )
}

export default AppContexts;