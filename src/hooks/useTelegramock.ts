import { useClientOnce } from './useClientOnce'
import { mockTelegramEnv,parseInitData,retrieveLaunchParams } from '@telegram-apps/sdk-react'

export function useTelegramMock():void {
    useClientOnce(()=>{
        let shouldMock: boolean;
        try {
            retrieveLaunchParams()
            shouldMock = !!sessionStorage.getItem('___mocked')
        } catch (error) {
            shouldMock = true
        }
        if(shouldMock){
            const initDataRaw = new URLSearchParams([
                ['user', JSON.stringify({
                    // id: 992313391,
                    id: 992313325,
                    first_name: 'drendo',
                    last_name: 'Rogue',
                    username: 'rogue',
                    language_code: 'en',
                    is_premium: true,
                    allows_write_to_pm: true,
                  })],
                  ['hash', '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31'],
                  ['auth_date', '1716922846'],
                  ['start_param', '992313391'],
                  ['chat_type', 'sender'],
                  ['chat_instance', '8428209589180549439'],
            ]).toString()
            mockTelegramEnv({
                themeParams: {
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
                },
                initData: parseInitData(initDataRaw),
                initDataRaw,
                version: '7.2',
                platform: 'tdesktop',
              });
              sessionStorage.setItem('____mocked', '1');

              console.info(
                'As long as the current environment was not considered as the Telegram-based one, it was mocked. Take a note, that you should not do it in production and current behavior is only specific to the development process. Environment mocking is also applied only in development mode. So, after building the application, you will not see this behavior and related warning, leading to crashing the application outside Telegram.',
              );
        }
    })
}