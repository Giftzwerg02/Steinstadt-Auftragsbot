import * as fs from 'fs'

export interface AuftragsMsg {
    title: string,
    text: string,
    cash: string,
    json: any
}

export function getAuftragsMsg(auftragsnummer: number): AuftragsMsg {
    let jsonString = fs.readFileSync(`../aufträge/${auftragsnummer}.json`, 'utf8')
    let allAuftragsJson: any[] = JSON.parse(jsonString)
    let randomAuftragIndex = Math.floor(Math.random() * allAuftragsJson.length);
    let randomAuftragsJson = allAuftragsJson[randomAuftragIndex]
    
    let auftragsMsg: AuftragsMsg
    auftragsMsg.json = randomAuftragsJson

    Object.entries(randomAuftragsJson).forEach(([key, value]) => {
        let valueStr = value as string
        switch (key) {
            case 'nummer':
                auftragsMsg.title = valueStr
                break
            case 'cash':
                auftragsMsg.cash = valueStr
                break
            default:
                auftragsMsg.text += valueStr + '\n'
                break
        }
    })
    return auftragsMsg
}
