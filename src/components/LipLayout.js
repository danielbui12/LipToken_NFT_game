import React from "react";
import LipRenderer from "./lipRenderer";
import * as s from '../styled/globalStyles'

function LipLayout({ 
  item, handleLevelUpLip, 
  loading, viewOnly, 
  handleChangeName,
  handleAttack
}) {
  const solidityTime = Number(item.readyTime.toString() + "000")
  const jsTime = Number(new Date())

  return (
    <s.Container>
      <LipRenderer lip={item} />
      <s.SpacerXSmall />
      <s.Container>
        <s.TextDescription margin="6px 0">ID: {item.id.toString()}</s.TextDescription>
        <s.TextDescription margin="6px 0">DNA: {item.dna.toString()}</s.TextDescription>
        <s.TextDescription margin="6px 0">LEVEL: {item.level}</s.TextDescription>
        <s.TextDescription margin="6px 0">RARITY: {item.rarity}</s.TextDescription>
        <s.TextDescription margin="6px 0">
          NAME: {item.name}
        </s.TextDescription>
        {
          !viewOnly && (
            <s.TextDescription margin="6px 0">WAIT TIME: {
              solidityTime < jsTime ? "READY" :
                new Date(solidityTime).toDateString()
            }</s.TextDescription>
          )
        }
        {
          !viewOnly ? (
            <>
              <s.SpacerXSmall />
              <div className="d-flex justify-content-between">
                <button disabled={loading} onClick={(e) => {
                  e.preventDefault()
                  handleLevelUpLip(item)
                }}>Level up</button>
                <button className="change_name" onClick={(e) => {
                  e.preventDefault()
                  const newName = window.prompt("Enter your new name: ")
                  handleChangeName(parseInt(item.id.toString()), newName)
                }}>
                  Change name
                  <span className="iconify" data-icon="gg:pen"></span>
                </button>
              </div>
            </>
          ) : (
            <button className="ml-1" disabled={loading} onClick={(e) => {
              e.preventDefault()
              handleAttack(parseInt(item.id.toString()))
            }}>Attack</button>
          )
        }
      </s.Container>
    </s.Container>
  )
}

export default LipLayout