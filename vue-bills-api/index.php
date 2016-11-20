<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

require_once __DIR__ . '/vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
$app = new Silex\Application();

function getBills($tBills)
{
    $json = file_get_contents(__DIR__ . '/bills.json');
    $data = json_decode($json, true);
    return $data[$tBills];
}

function findIndexById($id, $tBills)
{
    $bills = getBills($tBills);
    foreach ($bills as $key => $bill) {
        if ($bill['id'] == $id) {
            return $key;
        }
    }
    return false;
}

function writeBills($bills, $tBills)
{
    $t = $tBills == "billsPay" ? "billsReceive" : "billsPay";
    $data = [$tBills => $bills, $t => getBills($t)];

    $json = json_encode($data);
    file_put_contents(__DIR__ . '/bills.json', $json);
}

$app->before(function (Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : array());
    }
});

#### Route billsPay

$app->get('api/bills-pay', function () use ($app) {
    $bills = getBills('billsPay');
    return $app->json($bills);
});

$app->get('api/bills-pay/total', function () use ($app) {
    $bills = getBills('billsPay');
    $sum=0;
    foreach ($bills as $value) {
        $sum += (float)$value['value'];
    }
    return $app->json(['total' => $sum]);
});

$app->get('api/bills-pay/{id}', function ($id) use ($app) {
    $bills = getBills('billsPay');
    $bill = $bills[findIndexById($id, 'billsPay')];
    return $app->json($bill);
});

$app->post('api/bills-pay', function (Request $request) use ($app) {
    $bills = getBills('billsPay');
    $data = $request->request->all();
    $data['id'] = rand(100,100000);
    $bills[] = $data;
    writeBills($bills, 'billsPay');
    return $app->json($data);
});

$app->put('api/bills-pay/{id}', function (Request $request, $id) use ($app) {
    $bills = getBills('billsPay');
    $data = $request->request->all();
    $index = findIndexById($id, 'billsPay');
    $bills[$index] = $data;
    $bills[$index]['id'] = (int)$id;
    writeBills($bills, 'billsPay');
    return $app->json($bills[$index]);
});

$app->delete('api/bills-pay/{id}', function ($id) {
    $bills = getBills('billsPay');
    $index = findIndexById($id, 'billsPay');
    array_splice($bills,$index,1);
    writeBills($bills, 'billsPay');
    return new Response("", 204);
});

### Route billsReceive

$app->get('api/bills-receive', function () use ($app) {
    $bills = getBills('billsReceive');
    return $app->json($bills);
});

$app->get('api/bills-receive/total', function () use ($app) {
    $bills = getBills('billsReceive');
    $sum=0;
    foreach ($bills as $value) {
        $sum += (float)$value['value'];
    }
    return $app->json(['total' => $sum]);
});

$app->get('api/bills-receive/{id}', function ($id) use ($app) {
    $bills = getBills('billsReceive');
    $bill = $bills[findIndexById($id, 'billsReceive')];
    return $app->json($bill);
});

$app->post('api/bills-receive', function (Request $request) use ($app) {
    $bills = getBills('billsReceive');
    $data = $request->request->all();
    $data['id'] = rand(100,100000);
    $bills[] = $data;
    writeBills($bills, 'billsReceive');
    return $app->json($data);
});

$app->put('api/bills-receive/{id}', function (Request $request, $id) use ($app) {
    $bills = getBills('billsReceive');
    $data = $request->request->all();
    $index = findIndexById($id, 'billsReceive');
    $bills[$index] = $data;
    $bills[$index]['id'] = (int)$id;
    writeBills($bills, 'billsReceive');
    return $app->json($bills[$index]);
});

$app->delete('api/bills-receive/{id}', function ($id) {
    $bills = getBills('billsReceive');
    $index = findIndexById($id, 'billsReceive');
    array_splice($bills,$index,1);
    writeBills($bills, 'billsReceive');
    return new Response("", 204);
});

$app->match("{uri}", function($uri){
    return "OK";
})
->assert('uri', '.*')
->method("OPTIONS");


$app->run();