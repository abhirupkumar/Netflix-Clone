import { Plan } from '@/typings'
import { AiOutlineCheck } from 'react-icons/ai'
// import { Product } from '@stripe/firestore-stripe-payments'

// interface Props {
//   products: Product[]
//   selectedPlan: Product | null
// }

interface Props {
    plans: Plan[]
    selectedPlan: Plan | null
}

// function Table({ products, selectedPlan }: Props) {
function Table({ plans, selectedPlan }: Props) {
  return (
    <table>
      <tbody className="divide-y divide-[gray]">
        <tr className="tableRow">
          <td className="tableDataTitle">Monthly price</td>
          {/* {products.map((product) => (
            <td
              key={product.id}
              className={`tableDataFeature ${
                selectedPlan?.id === product.id
                  ? 'text-[#e50914]'
                  : 'text-[gray]'
              }`}
            >
              AED{product.prices[0].unit_amount! / 100}
            </td>
          ))} */}
          {plans.map((item) => (
            <td
              key={item.id}
              className={`tableDataFeature ${
                selectedPlan?.id === item.id
                  ? 'text-[#e50914]'
                  : 'text-[gray]'
              }`}
            >
              INR {item.amount}
            </td>
          ))}
        </tr>

        <tr className="tableRow">
          <td className="tableDataTitle">Video quality</td>
          {/* {products.map((product) => (
            <td
              key={product.id}
              className={`tableDataFeature ${
                selectedPlan?.id === product.id
                  ? 'text-[#e50914]'
                  : 'text-[gray]'
              }`}
            >
              {product.metadata.videoQuality}
            </td>
          ))} */}
          {plans.map((item) => (
            <td
              key={item.id}
              className={`tableDataFeature ${
                selectedPlan?.id === item.id
                  ? 'text-[#e50914]'
                  : 'text-[gray]'
              }`}
            >
              {item.videoQuality}
            </td>
          ))}
        </tr>

        <tr className="tableRow">
          <td className="tableDataTitle">Resolution</td>
          {/* {products.map((product) => (
            <td
              className={`tableDataFeature ${
                selectedPlan?.id === product.id
                  ? 'text-[#E50914]'
                  : 'text-[gray]'
              }`}
              key={product.id}
            >
              {product.metadata.resolution}
            </td>
          ))} */}
          {plans.map((item) => (
            <td
              key={item.id}
              className={`tableDataFeature ${
                selectedPlan?.id === item.id
                  ? 'text-[#e50914]'
                  : 'text-[gray]'
              }`}
            >
              {item.resolution}
            </td>
          ))}
        </tr>

        <tr className="tableRow">
          <td className="tableDataTitle">
            Availability
          </td>
          {/* {products.map((product) => (
            <td
              className={`tableDataFeature ${
                selectedPlan?.id === product.id
                  ? 'text-[#E50914]'
                  : 'text-[gray]'
              }`}
              key={product.id}
            >
              {product.metadata.portability === 'true' && (
                <AiOutlineCheck className="inline-block h-8 w-8" />
              )}
            </td>
          ))} */}
          {plans.map((item) => (
            <td
              key={item.id}
              className={`tableDataFeature ${
                selectedPlan?.id === item.id
                  ? 'text-[#e50914]'
                  : 'text-[gray]'
              }`}
            >
              {item.description}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}

export default Table