"use client"
import {
  SDKProvider,
  useLaunchParams,
  useMiniApp,
  useThemeParams,
  useViewport,
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  initBackButton,
  serializeThemeParams,
  parseThemeParams,
} from "@telegram-apps/sdk-react";
import { AppRoot } from '@telegram-apps/telegram-ui'
import { useTelegramMock } from "@/hooks/useTelegramock";
import { useDidMount } from "@/hooks/useDidMount";
import { PropsWithChildren, useEffect, useMemo } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { ErrorPage } from "./ErrorPage";
import { useRouter } from "next/navigation";
import SplashScreen from "./splashScreen";


function App(props:PropsWithChildren){
    const lp = useLaunchParams();
  const miniApp = useMiniApp();
  
  const serializedTheme = serializeThemeParams({
    accentTextColor: '#6ab2f2',
    bgColor: '#ffffff',
    buttonColor: '#5288c1',
    buttonTextColor: '#ffffff',
    destructiveTextColor: '#ec3942',
    headerBgColor: '#f5f535',
    hintColor: '#708499',
    linkColor: '#6ab3f3',
    secondaryBgColor: '#f5f5f5',
    sectionBgColor: '#17212b',
    sectionHeaderTextColor: '#6ab3f3',
    subtitleTextColor: '#708499',
    textColor: '#f5f5f5',
  })
 const p = parseThemeParams({
    accentTextColor: '#6ab2f2',
    bgColor: '#ffffff',
    buttonColor: '#5288c1',
    buttonTextColor: '#ffffff',
    destructiveTextColor: '#ec3942',
    headerBgColor: '#f5f535',
    hintColor: '#708499',
    linkColor: '#6ab3f3',
    secondaryBgColor: '#f5f5f5',
    sectionBgColor: '#17212b',
    sectionHeaderTextColor: '#6ab3f3',
    subtitleTextColor: '#708499',
    textColor: '#f5f5f5',
  })
  const themeParams = useThemeParams();

  console.log(p)
  console.log(serializedTheme)

  
  const viewport = useViewport();
  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);
  return (
    <AppRoot
      // appearance={miniApp.isDark ? 'light' : 'light'}
      appearance= 'light'
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
    >
      
      {props.children}
    </AppRoot>
  );
}

function RootInner({ children }: PropsWithChildren) {
    // Mock Telegram environment in development mode if needed.
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useTelegramMock();
    }
  
    const debug = useLaunchParams().startParam === 'debug';
    const manifestUrl = useMemo(() => {
      return new URL('tonconnect-manifest.json', window.location.href).toString();
    }, []);
  
    // Enable debug mode to see all the methods sent and events received.
    useEffect(() => {
      if (debug) {
        import('eruda').then((lib) => lib.default.init());
      }
    }, [debug]);
  
    return (
        <SDKProvider acceptCustomStyles debug={debug}>
          <App>
            {children}
          </App>
        </SDKProvider>
    );
  }
  export function Root(props: PropsWithChildren) {
    // Unfortunately, Telegram Mini Apps does not allow us to use all features of the Server Side
    // Rendering. That's why we are showing loader on the server side.
    const didMount = useDidMount();
    const router = useRouter()
   if(didMount){
    const [backButton] = initBackButton()
   
    backButton.show()
    backButton.on('click',()=> router.back())
   }
    return didMount ? (
      <ErrorBoundary fallback={ErrorPage}>
        <RootInner {...props}/>
      </ErrorBoundary>
    ) : <SplashScreen/>;
  }

