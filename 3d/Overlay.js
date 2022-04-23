import css from './3d.module.scss'

export default function Overlay() {
    return (
      <div className={[css.container, css.title].join(' ')}>
          <div>
            0800 DON ROUCH 💍
            <br />
            <span>
            NFT COLLECTION
            </span>
          </div>
      </div>
    )
  }
  